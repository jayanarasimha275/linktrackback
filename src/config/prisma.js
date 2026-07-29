import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
  log: ["query"],
});

console.log("Prisma keys:", Object.keys(prisma));
console.log("prisma.user =", prisma.user);
console.log("prisma.link =", prisma.link);
console.log("prisma.click =", prisma.click);
console.log("prisma.pixel =", prisma.pixel);
export default prisma;
