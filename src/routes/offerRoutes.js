import { Router } from "express";
import {
  createOffer,
  getOffers,
  getOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = Router();

router.get("/", getOffers);

router.get("/:id", getOffer);

router.post("/", createOffer);

router.put("/:id", updateOffer);

router.delete("/:id", deleteOffer);

export default router;
