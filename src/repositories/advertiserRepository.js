import prisma from "../config/prisma.js";

export async function findAllAdvertisers() {
  return prisma.advertiser.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findAdvertiserById(id) {
  return prisma.advertiser.findUnique({
    where: {
      id,
    },
  });
}

export async function createAdvertiser(data) {
  return prisma.advertiser.create({
    data,
  });
}

export async function updateAdvertiser(id, data) {
  return prisma.advertiser.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAdvertiser(id) {
  return prisma.advertiser.delete({
    where: {
      id,
    },
  });
}
