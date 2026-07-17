/**
 * DatabaseModule
 * Global module exposing the PrismaService database connection client.
 * Imported in AppModule to make PrismaService available to all modules.
 *
 * Related: src/database/prisma.service.ts, src/app.module.ts
 * Pattern: Global NestJS module
 */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
