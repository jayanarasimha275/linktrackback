import express from "express";

import {
  getLinks,
  getLinkById,
  createLink,
  getLinkClicks,
  updateLinkController,
  deleteLinkController,
} from "../controllers/links.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id/clicks", getLinkClicks);
router.get("/", authenticate, getLinks);

router.post("/", authenticate, createLink);
router.put("/:id", authenticate, updateLinkController);

router.delete("/:id", authenticate, deleteLinkController);

export default router;
