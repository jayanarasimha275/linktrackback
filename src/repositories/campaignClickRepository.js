import prisma from "../config/prisma.js";

export async function findCampaignClickById(id) {
  return prisma.campaignClick.findUnique({
    where: {
      id,
    },
    include: {
      campaign: {
        include: {
          offer: true,
          publisher: true,
        },
      },
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
    include: {
      campaign: {
        include: {
          offer: true,
          publisher: true,
        },
      },
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
