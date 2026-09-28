import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma 7 rust-free client — PostgreSQL bağlantısı driver adapter üzerinden.
 * - Instance globalThis üzerinde tekilleştirilir (dev hot-reload bağlantı şişmesi).
 * - Lazy: DATABASE_URL yoksa modül yüklenmesi patlamaz; ilk gerçek kullanımda
 *   anlamlı bir hata verir. Böylece DB'siz ortamda (ör. DB bağlanmamış Vercel
 *   deploy'u) build sağlıklı geçer.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL tanımlı değil. .env (yerel) veya Vercel environment variables (production) kontrol edin."
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getClient(): PrismaClient {
  globalForPrisma.prisma ??= createClient();
  return globalForPrisma.prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
