import {
  findCampaignClickById,
  markCampaignClickConverted,
} from "../repositories/campaignClickRepository.js";

import prisma from "../config/prisma.js";

export async function processConversion(clickId) {
  const click = await findCampaignClickById(clickId);

  if (!click) {
    throw new Error("Click not found.");
  }

  if (click.converted) {
    throw new Error("This click has already been converted.");
  }

  const campaign = click.campaign;

  if (!campaign) {
    throw new Error("Campaign not found for this click.");
  }

  const payout = Number(campaign.offer?.affiliatePayout || 0);
  const revenue = Number(campaign.offer?.advertiserPayout || 0);

  const convertedClick = await markCampaignClickConverted(click.id);

  const updatedCampaign = await prisma.campaign.update({
    where: {
      id: campaign.id,
    },
    data: {
      conversions: {
        increment: 1,
      },
      payout: {
        increment: payout,
      },
      revenue: {
        increment: revenue,
      },
    },
  });

  return {
    click: convertedClick,
    campaign: updatedCampaign,
    payout,
    revenue,
  };
}
