import express from "express";

import {
  getLinks,
  getLinkById,
  createLink,
  getLinkClicks,
} from "../controllers/links.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id/clicks", getLinkClicks);
router.get("/", authenticate, getLinks);

router.post("/", authenticate, createLink);

export default router;
