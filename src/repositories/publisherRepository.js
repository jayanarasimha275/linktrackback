import prisma from "../config/prisma.js";

export async function findAllPublishers() {
  return prisma.publisher.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findPublisherById(id) {
  return prisma.publisher.findUnique({
    where: {
      id,
    },
  });
}

export async function findPublisherByEmail(email) {
  return prisma.publisher.findUnique({
    where: {
      email,
    },
  });
}

export async function createPublisher(data) {
  return prisma.publisher.create({
    data,
  });
}

export async function updatePublisher(id, data) {
  return prisma.publisher.update({
    where: {
      id,
    },
    data,
  });
}

export async function deletePublisher(id) {
  return prisma.publisher.delete({
    where: {
      id,
    },
  });
}
