import { Router } from "express";

import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  resolveTrackingCode,
  getCampaignAnalyticsData,
  getOrCreateCampaign,
} from "../controllers/campaignController.js";

const router = Router();
router.get("/", getAllCampaigns);
router.get("/lookup", getOrCreateCampaign);
router.get("/track/:trackingCode", resolveTrackingCode);

router.get("/:id/analytics", getCampaignAnalyticsData);
router.get("/:id", getCampaignById);


router.post("/", createCampaign);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

export default router;
