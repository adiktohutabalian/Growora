import { PrismaClient, type User } from "@/lib/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { Availability } from "@/lib/types";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** Transform Prisma User (JSON string availability) → frontend User (array) */
export function serializeUser(user: User) {
  return {
    ...user,
    availability: JSON.parse(user.availability) as Availability[],
  };
}
