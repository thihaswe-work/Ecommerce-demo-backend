import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const seeder = appContext.get(SeederService);

  try {
    await seeder.seedDatabase();
    console.log('✅ Database seeding completed.');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await appContext.close();
  }
}

bootstrap();
