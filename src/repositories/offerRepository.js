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
export async function findOfferById(id) {
  return prisma.offer.findUnique({
    where: {
      id,
    },
  });
}

function mapOfferData(data) {
  return {
    offerName: data.offerName,
    advertiser: data.advertiser,
    affiliate: data.affiliate,

    logoUrl: data.logoUrl,
    categoryId: data.categoryId || null,

    appId: data.appId,
    externalOfferId: data.externalOfferId,

    advertiserPayout: Number(data.advertiserPayout || 0),
    affiliatePayout: Number(data.affiliatePayout || 0),

    revenueModel: data.revenueModel,
    revenueCurrency: data.revenueCurrency,
    payoutModel: data.payoutModel,
    hidePayout: Boolean(data.hidePayout),

    previewUrl: data.previewUrl,
    trackingUrl: data.trackingUrl,
    fallbackUrl: data.fallbackUrl,
    deepLink: data.deepLink,

    visibility: data.visibility,
    alertAffiliates: Boolean(data.alertAffiliates),

    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,

    dailyScheduleEnabled: Boolean(data.dailyScheduleEnabled),
    dailyStartTime: data.dailyStartTime,
    dailyStopTime: data.dailyStopTime,

    status: data.status,
    timezone: data.timezone,

    geo: data.geo,
    os: data.os,
    browser: data.browser,
    device: data.device,
    isp: data.isp,

    targetingRules: data.targetingRules || undefined,

    assignedAffiliate: data.assignedAffiliate,

    capType: data.capType,
    capValue: Number(data.capValue || 0),

    privateNote: data.privateNote,
    termsKpi: data.termsKpi,
    terms: data.terms,
  };
}

export async function createOffer(data) {
  return prisma.offer.create({
    data: mapOfferData(data),
  });
}

export async function updateOffer(id, data) {
  return prisma.offer.update({
    where: { id },
    data: mapOfferData(data),
  });
}
export async function deleteOffer(id) {
  return prisma.offer.delete({
    where: {
      id,
    },
  });
}
