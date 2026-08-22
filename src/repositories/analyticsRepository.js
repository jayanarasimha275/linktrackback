import prisma from "../config/prisma.js";

export async function getTotalCampaigns() {
  return prisma.campaign.count();
}

export async function getActiveCampaigns() {
  return prisma.campaign.count({
    where: {
      status: "ACTIVE",
    },
  });
}

export async function getTotalClicks() {
  const result = await prisma.campaign.aggregate({
    _sum: {
      clicks: true,
    },
  });

  return result._sum.clicks || 0;
}

export async function getTotalUniqueVisitors() {
  const result = await prisma.campaign.aggregate({
    _sum: {
      uniqueVisitors: true,
    },
  });

  return result._sum.uniqueVisitors || 0;
}

export async function getTotalConversions() {
  const result = await prisma.campaign.aggregate({
    _sum: {
      conversions: true,
    },
  });

  return result._sum.conversions || 0;
}

export async function getTotalRevenue() {
  const result = await prisma.campaign.aggregate({
    _sum: {
      revenue: true,
    },
  });

  return result._sum.revenue || 0;
}

export async function getTotalPayout() {
  const result = await prisma.campaign.aggregate({
    _sum: {
      payout: true,
    },
  });

  return result._sum.payout || 0;
}

export async function getRecentClicks(limit = 10) {
  return prisma.campaignClick.findMany({
    take: limit,
    orderBy: {
      clickedAt: "desc",
    },
    include: {
      campaign: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
