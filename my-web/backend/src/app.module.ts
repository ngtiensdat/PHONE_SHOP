/**
 * AppModule — Root NestJS Module
 * Registers: ConfigModule, ThrottlerModule, PassportModule, and all feature modules.
 * Database module (PrismaService) is imported as a global provider.
 *
 * Related: src/main.ts, src/database/prisma.service.ts, src/config/app.config.ts
 * Pattern: NestJS Root Module with global ConfigModule
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { appConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),

    // Rate limiting: 60 requests / 60 seconds per IP
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 60,
      },
    ]),

    DatabaseModule,
    AuthModule,

    // Feature modules will be added here as they are scaffolded:
    // UserModule, ProductModule, CategoryModule,
    // InventoryModule, CartModule, OrderModule, VoucherModule,
    // ReviewModule, PaymentModule, AiModule, MailModule,
    // MediaModule, NotificationModule, BugReportModule, AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
