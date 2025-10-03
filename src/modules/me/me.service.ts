import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { Address } from "src/entities/address.entity";
import { PaymentMethod } from "src/entities/payment-method.entity";
import { Order } from "src/entities/order.entity";

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async islogin(
    token?: string,
  ): Promise<{ user: User; newToken?: string } | null> {
    // In real app, verify JWT. For now, we just check the token string
    if (!token) throw new UnauthorizedException("Unauthorized");

    let payload: any;
    let newToken: string | undefined;

    try {
      payload = jwt.verify(token, process.env.JWT_USER_SECRET || "user-secret");
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        payload = jwt.decode(token);

        if (!payload || typeof payload === "string") {
          throw new UnauthorizedException("Unauthorized");
        }

        newToken = jwt.sign(
          { id: payload.id, email: payload.email },
          process.env.JWT_USER_SECRET || "user-secret",
          { expiresIn: "7d" },
        );
      } else {
        throw new UnauthorizedException("Unauthorized");
      }
    }
    // Return a sample user, you can fetch actual user if you store userId in JWT
    const user = await this.repo.findOneBy({ email: payload.email }); // example

    if (!user) {
      throw new UnauthorizedException("Not logged in");
    }

    return { user, newToken };
  }

  async login(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<{ user: User; token: string }> {
    const user = await this.repo.findOneBy({ email });

    if (!user) throw new Error("Email is Incorrect");
    if (user.password !== password) {
      throw new UnauthorizedException("Wrong Credentials");
    }

    // const token = 'myUserToken';
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_USER_SECRET || "user-secret",
      { expiresIn: remember ? "30d" : "1d" },
    );

    return { user, token };
  }

  async profile(userId: string) {
    try {
      const addresses = await this.addressRepo.find({
        where: { user: { id: userId } }, // <-- relation query
      });
      const paymentMethods = await this.paymentMethodRepo.find({
        where: { user: { id: userId } },
      });
      const orders = await this.orderRepo.findBy({ customerId: userId });

      return { addresses, paymentMethods, orders };
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw new InternalServerErrorException("Failed to fetch user profile");
    }
  }
}
