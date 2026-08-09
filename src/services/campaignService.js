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
