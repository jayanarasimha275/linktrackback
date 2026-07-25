import crypto from "crypto";
import prisma from "../src/config/prisma.js";

const pixels = await prisma.pixel.findMany();

for (const pixel of pixels) {
  await prisma.pixel.update({
    where: {
      id: pixel.id,
    },
    data: {
      pixelToken: crypto.randomUUID(),
    },
  });
}

console.log("✅ All pixel tokens generated.");

await prisma.$disconnect();
