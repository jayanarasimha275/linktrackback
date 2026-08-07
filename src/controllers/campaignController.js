import {
  getCampaigns,
  getCampaign,
  addCampaign,
  editCampaign,
  removeCampaign,
  getCampaignByTrackingCode,
} from "../services/campaignService.js";

export async function getAllCampaigns(req, res, next) {
  try {
    const campaigns = await getCampaigns();

    res.json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCampaignById(req, res, next) {
  try {
    const campaign = await getCampaign(req.params.id);

    res.json({
      success: true,
      data: campaign,
    });
  } catch (err) {
    next(err);
  }
}

export async function createCampaign(req, res, next) {
  try {
    const campaign = await addCampaign(req.body);

    res.status(201).json({
      success: true,
      message: "Campaign created successfully.",
      data: campaign,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCampaign(req, res, next) {
  try {
    const campaign = await editCampaign(req.params.id, req.body);

    res.json({
      success: true,
      message: "Campaign updated successfully.",
      data: campaign,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteCampaign(req, res, next) {
  try {
    await removeCampaign(req.params.id);

    res.json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}
export async function resolveTrackingCode(req, res, next) {
  try {
    const campaign = await getCampaignByTrackingCode(
      req.params.trackingCode,
      {
        ipAddress:
          req.headers["x-forwarded-for"]?.split(",")[0] ||
          req.socket.remoteAddress,

        userAgent: req.headers["user-agent"],

        referrer:
          req.headers["referer"] ||
          req.headers["referrer"] ||
          null,
      }
    );

    if (!campaign.offer?.trackingUrl) {
      return res.status(404).json({
        success: false,
        message: "Offer tracking URL not found.",
      });
    }

    return res.redirect(campaign.offer.trackingUrl);
  } catch (err) {
    next(err);
  }
}
