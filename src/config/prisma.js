import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

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
export default prisma;
