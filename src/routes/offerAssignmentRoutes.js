import { Router } from "express";
import {
  getAssignments,
  createAssignment,
  updateAssignmentStatus,
  deleteAssignment,
} from "../controllers/offerAssignmentController.js";

const router = Router();

router.get("/", getAssignments);
router.post("/", createAssignment);
router.patch("/:id/status", updateAssignmentStatus);
router.delete("/:id", deleteAssignment);

export default router;
