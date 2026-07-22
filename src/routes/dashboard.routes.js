import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { getDashboardAnalytics } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", authenticate, getDashboardAnalytics);

export default router;
