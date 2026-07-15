import express from "express";

import {
    redirectTrackingLink,
} from "../controllers/tracking.controller.js";

const router = express.Router();

router.get("/:shortCode", redirectTrackingLink);

export default router;