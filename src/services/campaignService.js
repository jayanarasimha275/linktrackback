import {
  findAllCampaigns,
  findCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  incrementCampaignClicks,
} from "../repositories/campaignRepository.js";
import { findOfferById } from "../repositories/offerRepository.js";
import { findPublisherById } from "../repositories/publisherRepository.js";
import { findCampaignByOfferAndPublisher } from "../repositories/campaignRepository.js";
import { findCampaignByTrackingCode } from "../repositories/campaignRepository.js";

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

export async function getCampaignByTrackingCode(trackingCode) {
  const campaign = await findCampaignByTrackingCode(trackingCode);

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  if (campaign.status !== "ACTIVE") {
    throw new Error("Campaign is inactive.");
  }

  await incrementCampaignClicks(campaign.id);

  campaign.clicks += 1;

  return campaign;
}
