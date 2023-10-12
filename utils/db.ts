import { createApiClient } from '@neondatabase/api-client';
import { PrismaClient } from '@prisma/client';

export const apiClient = createApiClient({
  apiKey: process.env.NEON_API_KEY!, //* ! is let it know its never null
});

// * Fancy way of coercing a type in TypeScript (unknown first then something)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
