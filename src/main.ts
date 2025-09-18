import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
bootstrap();
