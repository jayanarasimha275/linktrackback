import { Router } from "express";

import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  resolveTrackingCode,
} from "../controllers/campaignController.js";

const router = Router();

router.get("/", getAllCampaigns);
router.get("/track/:trackingCode", resolveTrackingCode);

router.get("/:id", getCampaignById);


router.post("/", createCampaign);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

export default router;
