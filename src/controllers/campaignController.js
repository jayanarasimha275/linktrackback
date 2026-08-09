import {
  getCampaigns,
  getCampaign,
  addCampaign,
  editCampaign,
  removeCampaign,
  getCampaignByTrackingCode,
} from "../services/campaignService.js";

import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

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
    const userAgent = req.headers["user-agent"] || "";

    const parser = new UAParser(userAgent);
    const parsed = parser.getResult();

    const browser = parsed.browser.name || null;
    const operatingSystem = parsed.os.name || null;
    const deviceType = parsed.device.type || "desktop";

    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    const referrer =
      req.headers["referer"] ||
      req.headers["referrer"] ||
      null;

    const geo = ipAddress ? geoip.lookup(ipAddress) : null;

    const country = geo?.country || null;
    const city = geo?.city || null;

    const campaign = await getCampaignByTrackingCode(
      req.params.trackingCode,
      {
        ipAddress,
        userAgent,
        browser,
        operatingSystem,
        deviceType,
        referrer,
        country,
        city,
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
