import prisma from "../config/prisma.js";

export async function findCampaignClickById(id) {
  return prisma.campaignClick.findUnique({
    where: {
      id,
    },
  });
}

export async function findCampaignClickByTrackingCode(trackingCode) {
  return prisma.campaignClick.findFirst({
    where: {
      trackingCode,
    },
    orderBy: {
      clickedAt: "desc",
    },
  });
}

export async function findCampaignClickByClickId(clickId) {
  return prisma.campaignClick.findUnique({
    where: {
      id: clickId,
    },
  });
}

export async function markCampaignClickConverted(id) {
  return prisma.campaignClick.update({
    where: {
      id,
    },
    data: {
      converted: true,
    },
  });
}
