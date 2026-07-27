import prisma from "../config/prisma.js";

export const findPixelByLinkId = async (linkId) => {
  return prisma.pixel.findUnique({
    where: {
      linkId: Number(linkId),
    },
  });
};

export const createPixelRecord = async ({
  linkId,
  pixelName,
  pixelType,
  isActive,
}) => {
  return prisma.pixel.create({
    data: {
      linkId: Number(linkId),
      pixelName,
      pixelType,
      isActive,
    },
  });
};

export const updatePixelRecord = async (linkId, data) => {
  return prisma.pixel.update({
    where: {
      linkId: Number(linkId),
    },
    data,
  });
};

export const deletePixelRecord = async (linkId) => {
  return prisma.pixel.delete({
    where: {
      linkId: Number(linkId),
    },
  });
};
export const findPixelByToken = async (pixelToken) => {
  return prisma.pixel.findUnique({
    where: {
      pixelToken,
    },
    include: {
      link: true,
    },
  });
};
