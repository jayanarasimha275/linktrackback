import prisma from "../config/prisma.js";

export const getLinkAnalytics = async (linkId) => {
  const link = await prisma.link.findUnique({
    where: {
      id: Number(linkId),
    },
    select: {
      clicks: true,
      uniqueClicks: true,
      conversions: true,
      desktopClicks: true,
      mobileClicks: true,
      tabletClicks: true,
      topCountry: true,
    },
  });

  if (!link) {
    throw new Error("Link not found");
  }

  const conversionRate =
    link.clicks > 0
      ? Number(((link.conversions / link.clicks) * 100).toFixed(2))
      : 0;

  return {
    ...link,
    conversionRate,
  };
};
