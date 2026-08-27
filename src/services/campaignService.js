import {
  findAllCampaigns,
  findCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  incrementCampaignClicks,
  findCampaignByOfferAndPublisher,
  findCampaignByTrackingCode,
  createCampaignClick,
} from "../repositories/campaignRepository.js";

import { findOfferById } from "../repositories/offerRepository.js";
import { findPublisherById } from "../repositories/publisherRepository.js";
import { getAssignments } from "../repositories/offerAssignmentRepository.js";
import prisma from "../config/prisma.js";

export async function getCampaigns() {
  return findAllCampaigns();
}

export async function getCampaign(id) {
  const campaign = await findCampaignById(id);

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  return campaign;
}

export async function addCampaign(data) {
  const offer = await findOfferById(data.offerId);

  if (!offer) {
    throw new Error("Offer not found.");
  }

  const publisher = await findPublisherById(data.publisherId);

  if (!publisher) {
    throw new Error("Publisher not found.");
  }

  const existingCampaign = await findCampaignByOfferAndPublisher(
    data.offerId,
    data.publisherId
  );

  if (existingCampaign) {
    throw new Error(
      "A campaign already exists for this Offer and Publisher."
    );
  }

  return createCampaign(data);
}
export async function getOrCreateCampaignForOfferAndPublisher(
  offerId,
  publisherId
) {
  const offer = await findOfferById(offerId);

  if (!offer) {
    throw new Error("Offer not found.");
  }

  const publisher = await findPublisherById(publisherId);

  if (!publisher) {
    throw new Error("Publisher not found.");
  }

  // Publisher must be APPROVED for this offer.
  const approvedAssignments = await getAssignments({
    offerId,
    publisherId,
    status: "APPROVED",
  });

  if (approvedAssignments.length === 0) {
    throw new Error(
      "This publisher is not approved for this offer."
    );
  }

  // Reuse existing campaign if one already exists.
  const existing = await findCampaignByOfferAndPublisher(
    offerId,
    publisherId
  );

  if (existing) {
    return existing;
  }

  const publisherName =
    `${publisher.firstName || ""} ${publisher.lastName || ""}`.trim();

  const autoName =
    `${offer.offerName || "Offer"} - ${
      publisherName || publisher.email
    }`;

  return createCampaign({
    name: autoName,
    offerId,
    publisherId,
  });
}

export async function editCampaign(id, data) {
  await getCampaign(id);

  return updateCampaign(id, data);
}

export async function removeCampaign(id) {
  await getCampaign(id);

  return deleteCampaign(id);
}

export async function getCampaignByTrackingCode(
  trackingCode,
  visitorData = {}
) {
  const campaign = await findCampaignByTrackingCode(trackingCode);

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  if (campaign.status !== "ACTIVE") {
    throw new Error("Campaign is inactive.");
  }

  const existingClick = await prisma.campaignClick.findFirst({
    where: {
      campaignId: campaign.id,
      ipAddress: visitorData.ipAddress ?? null,
      userAgent: visitorData.userAgent ?? null,
    },
  });

  await createCampaignClick({
    campaignId: campaign.id,
    trackingCode: campaign.trackingCode,
    ipAddress: visitorData.ipAddress ?? null,
    userAgent: visitorData.userAgent ?? null,
    browser: visitorData.browser ?? null,
    operatingSystem: visitorData.operatingSystem ?? null,
    deviceType: visitorData.deviceType ?? null,
    referrer: visitorData.referrer ?? null,
    country: visitorData.country ?? null,
    city: visitorData.city ?? null,
  });

  if (!existingClick) {
    await prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: {
        uniqueVisitors: {
          increment: 1,
        },
      },
    });
  }

  await incrementCampaignClicks(campaign.id);

  campaign.clicks += 1;

  return campaign;
}

export async function getCampaignAnalytics(id) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
  });

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  const clicks = await prisma.campaignClick.findMany({
    where: {
      campaignId: id,
    },
    select: {
      ipAddress: true,
      deviceType: true,
      converted: true,
    },
  });

  const totalClicks = clicks.length;

  const uniqueVisitors = new Set(
    clicks
      .map((click) => click.ipAddress)
      .filter(Boolean)
  ).size;

  const conversions = clicks.filter(
    (click) => click.converted
  ).length;

  const desktop = clicks.filter(
    (click) => click.deviceType === "desktop"
  ).length;

  const mobile = clicks.filter(
    (click) => click.deviceType === "mobile"
  ).length;

  const tablet = clicks.filter(
    (click) => click.deviceType === "tablet"
  ).length;

  return {
    campaign: {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
    },

    stats: {
      clicks: totalClicks,
      uniqueVisitors,
      conversions,
      revenue: campaign.revenue,
      payout: campaign.payout,
    },

    devices: {
      desktop,
      mobile,
      tablet,
    },
  };
}
