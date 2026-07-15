import prisma from "../config/prisma.js";

export const findAllLinks = async () => {
  return prisma.link.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findLinkById = async (id) => {
  return prisma.link.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const findLinkByShortCode = async (shortCode) => {
  return prisma.link.findUnique({
    where: {
      shortCode,
    },
  });
};

export const createLinkRecord = async ({
  title,
  shortCode,
  destinationUrl,
  isActive,
  clicks,
  visitors,
  conversions,
  mobileClicks,
  desktopClicks,
  tabletClicks,
  topCountry,
}) => {
  return prisma.link.create({
    data: {
      title,
      shortCode,
      destinationUrl,

      isActive,

      clicks,
      visitors,
      conversions,

      mobileClicks,
      desktopClicks,
      tabletClicks,

      topCountry,
    },
  });
};
export const incrementLinkClicks = async (id) => {
  return prisma.link.update({
    where: {
      id: Number(id),
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
};
export const createClickRecord = async (data) => {
  return prisma.click.create({
    data,
  });
};
export const findUniqueVisitorClick = async (linkId, visitorId) => {
  return prisma.click.findFirst({
    where: {
      linkId,
      visitorId,
    },
  });
};
