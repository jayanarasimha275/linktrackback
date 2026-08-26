import { Router } from "express";
import {
  getOfferCategories,
  createOfferCategory,
} from "../controllers/offerCategoryController.js";

const router = Router();

router.get("/", getOfferCategories);
router.post("/", createOfferCategory);

export default router;
