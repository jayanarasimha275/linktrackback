import { Router } from "express";

import {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../controllers/publisherController.js";

const router = Router();

router.get("/", getAllPublishers);

router.get("/:id", getPublisherById);

router.post("/", createPublisher);

router.put("/:id", updatePublisher);

router.delete("/:id", deletePublisher);

export default router;
