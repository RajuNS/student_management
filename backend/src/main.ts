/**
 * main.ts
 * -----------------------------------------------
 * Application bootstrap.
 *
 * - Enables CORS so the React frontend (port 5173) can call the API.
 * - Enables global validation pipes for DTO validation.
 * - Listens on port 3000 by default.
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS configuration to allow all origins in production
  app.enableCors({
    origin: true, // Allow any origin, or change to a specific URL when known
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Enable global validation with class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown properties
      forbidNonWhitelisted: true, // Throw if unknown properties are sent
      transform: true,           // Auto-transform payloads to DTO instances
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend API running on http://localhost:${port}`);
}
bootstrap();
