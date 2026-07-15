import prisma from "./prisma.js";

export const connectDatabase = async () => {
  try {
    await prisma.$connect();

    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed");
    console.error(error);

    process.exit(1);
  }
};

