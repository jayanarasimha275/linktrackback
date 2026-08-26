import prisma from "../config/prisma.js";

export async function getAssignments({ offerId, publisherId, status } = {}) {
  return prisma.offerAssignment.findMany({
    where: {
      ...(offerId && { offerId }),
      ...(publisherId && { publisherId }),
      ...(status && { status }),
    },
    include: {
      offer: true,
      publisher: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createAssignment(offerId, publisherId) {
  return prisma.offerAssignment.create({
    data: {
      offerId,
      publisherId,
      status: "PENDING",
    },
    include: {
      offer: true,
      publisher: true,
    },
  });
}

export async function updateAssignmentStatus(id, status) {
  return prisma.offerAssignment.update({
    where: { id },
    data: { status },
    include: {
      offer: true,
      publisher: true,
    },
  });
}

export async function deleteAssignment(id) {
  return prisma.offerAssignment.delete({
    where: { id },
  });
}
