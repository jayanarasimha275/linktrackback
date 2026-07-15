import express from "express";

import {
  getLinks,
  getLinkById,
  createLink,
  getLinkClicks,
} from "../controllers/links.controller.js";

const router = express.Router();

router.get("/", getLinks);

router.get("/:id/clicks", getLinkClicks);
router.get("/:id", getLinkById);

router.post("/", createLink);

export default router;
