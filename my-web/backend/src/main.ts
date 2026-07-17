/**
 * main.ts — Bootstrap NestJS Application
 * Sets up: Helmet, CORS, ValidationPipe, Global Filter, Global Interceptor, Cookie Parser.
 *
 * Related: src/app.module.ts, src/common/filters/, src/common/interceptors/
 * Pattern: NestJS bootstrap with security hardening
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendUrl =
    configService.get<string>('frontendUrl') ?? 'http://localhost:3000';
  const port = configService.get<number>('port') ?? 3001;

  // Security
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // CORS
  app.enableCors({
    origin: [frontendUrl],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Cookie Parser
  app.use(cookieParser());

  // Global pipes, filters, interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // API prefix
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`🚀 PHONE_SHOP Backend running on: http://localhost:${port}/api`);
}

void bootstrap();
