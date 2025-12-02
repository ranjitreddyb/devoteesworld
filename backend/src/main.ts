import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security: Helmet middleware
  app.use(helmet());

  // CORS - Allow frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      process.env.PROD_FRONTEND_URL || 'https://devoteesworld.com',
    ],
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // API prefix
  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('DevoteeWorld API')
    .setDescription('Hindu Religious Platform API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Events')
    .addTag('Bookings')
    .addTag('Payments')
    .addTag('Admin')
    .addTag('Analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI - publicly accessible
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;

  // Dynamic seed import
  try {
    const { SeedService } = await import('./database/seeds');
    const seedService = app.get(SeedService);
    await seedService.seed();
  } catch (error) {
    console.log('⚠️ Seed service not available, skipping seed');
  }

  await app.listen(port);
  console.log(`🚀 DevoteeWorld Backend running on port ${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/docs`);
}

bootstrap();
