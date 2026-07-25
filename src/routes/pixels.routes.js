import express from "express";
import {
  getPixelByLinkId,
  createPixel,
  updatePixelController,
  deletePixelController,
  trackPixelConversion,
} from "../controllers/pixels.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/track/:token", trackPixelConversion);
router.get("/:linkId", authenticate, getPixelByLinkId);

router.post("/", authenticate, createPixel);

router.put("/:linkId", authenticate, updatePixelController);

router.delete("/:linkId", authenticate, deletePixelController);

export default router;
