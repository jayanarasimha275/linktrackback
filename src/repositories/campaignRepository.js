import prisma from "../config/prisma.js";

export async function findAllCampaigns() {
  return prisma.campaign.findMany({
    include: {
      offer: true,
      publisher: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findCampaignById(id) {
  return prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      offer: true,
      publisher: true,
    },
  });
}

export async function createCampaign(data) {
  return prisma.campaign.create({
    data,
  });
}

export async function createCampaign(data) {
  return prisma.campaign.create({
    data: {
      name: data.name,

      offerId: data.offerId,
      publisherId: data.publisherId,

      trackingDomain: data.trackingDomain ?? null,

      status: data.status ?? "ACTIVE",

      trafficSource: data.trafficSource ?? null,

      dailyCap: Number(data.dailyCap ?? 0),
      totalCap: Number(data.totalCap ?? 0),
    },
  });
}
export async function deleteCampaign(id) {
  return prisma.campaign.delete({
    where: {
      id,
    },
  });
}
export async function findCampaignByOfferAndPublisher(offerId, publisherId) {
  return prisma.campaign.findFirst({
    where: {
      offerId,
      publisherId,
    },
  });
}

export async function findCampaignByTrackingCode(trackingCode) {
  return prisma.campaign.findUnique({
    where: {
      trackingCode,
    },
    include: {
      offer: true,
      publisher: true,
    },
  });
}

export async function incrementCampaignClicks(id) {
  return prisma.campaign.update({
    where: {
      id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
}
export async function createCampaignClick(data) {
  return prisma.campaignClick.create({
    data,
  });
}
