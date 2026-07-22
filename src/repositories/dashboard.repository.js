import prisma from "../config/prisma.js";

export const getDashboardAnalytics = async (userId) => {
  const links = await prisma.link.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      clicksData: {
        orderBy: {
          clickedAt: "asc",
        },
      },
    },
  });

  return links;
};
