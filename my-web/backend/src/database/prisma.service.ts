/**
 * PrismaService
 * Singleton database connection using Prisma ORM with PostgreSQL adapter (pg pool).
 * Provides onModuleInit/onModuleDestroy lifecycle hooks for graceful connect/disconnect.
 *
 * Related: src/app.module.ts, prisma/schema.prisma
 * Pattern: NestJS Injectable Service + OnModuleInit
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
// Inherit from PrismaClient generated from schema.prisma
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    await this.pool.end();
  }
}
