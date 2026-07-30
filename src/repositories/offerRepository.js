import prisma from "../config/prisma.js";

export async function getOffers() {
  return prisma.offer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOffer(id) {
  return prisma.offer.findUnique({
    where: {
      id,
    },
  });
}

export async function createOffer(data) {
  return prisma.offer.create({
    data: {
      offerName: data.offerName,
      advertiser: data.advertiser,
      affiliate: data.affiliate,

      advertiserPayout: Number(data.advertiserPayout || 0),
      affiliatePayout: Number(data.affiliatePayout || 0),

      previewUrl: data.previewUrl,
      trackingUrl: data.trackingUrl,
      fallbackUrl: data.fallbackUrl,

      visibility: data.visibility,

      startDate: data.startDate
        ? new Date(data.startDate)
        : null,

      endDate: data.endDate
        ? new Date(data.endDate)
        : null,

      status: data.status,
      timezone: data.timezone,

      geo: data.geo,
      os: data.os,
      browser: data.browser,
      device: data.device,
      isp: data.isp,

      assignedAffiliate: data.assignedAffiliate,

      capType: data.capType,
      capValue: Number(data.capValue || 0),
    },
  });
}

export async function updateOffer(id, data) {
  return prisma.offer.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
}

export async function deleteOffer(id) {
  return prisma.offer.delete({
    where: {
      id,
    },
  });
}
