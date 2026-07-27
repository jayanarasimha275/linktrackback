import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { fetchLinkAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/:linkId", authenticate, fetchLinkAnalytics);

export default router;
