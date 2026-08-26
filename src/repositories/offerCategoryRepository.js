import prisma from "../config/prisma.js";

export async function getOfferCategories() {
  return prisma.offerCategory.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createOfferCategory(name) {
  return prisma.offerCategory.create({
    data: { name },
  });
}
