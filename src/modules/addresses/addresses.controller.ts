import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import type { Request } from "express";
import { Address } from "src/entities/address.entity";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Post()
  create(@Req() req: Request, @Body() body: Partial<Address>) {
    return this.addressService.create(body);
  }

  @Put()
  update(
    @Req() req: Request,
    @Param() id: number,
    @Body() body: Partial<Address>,
  ) {
    return this.addressService.update(id, body);
  }
}
