import * as offerAssignmentService from "../services/offerAssignmentService.js";

export async function getAssignments(req, res) {
  try {
    const { offerId, publisherId, status } = req.query;
    const assignments = await offerAssignmentService.getAssignments({
      offerId,
      publisherId,
      status,
    });
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch assignments." });
  }
}

export async function createAssignment(req, res) {
  try {
    const { offerId, publisherId } = req.body;
    const assignment = await offerAssignmentService.createAssignment(
      offerId,
      publisherId
    );
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "This publisher is already assigned to this offer." });
    }

    res.status(400).json({ message: error.message || "Failed to create assignment." });
  }
}

export async function updateAssignmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const assignment = await offerAssignmentService.updateAssignmentStatus(id, status);
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Failed to update assignment." });
  }
}

export async function deleteAssignment(req, res) {
  try {
    const { id } = req.params;
    await offerAssignmentService.deleteAssignment(id);
    res.status(200).json({ message: "Assignment deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete assignment." });
  }
}
