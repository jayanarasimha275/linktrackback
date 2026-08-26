import * as offerAssignmentRepository from "../repositories/offerAssignmentRepository.js";

export async function getAssignments(filters) {
  return await offerAssignmentRepository.getAssignments(filters);
}

export async function createAssignment(offerId, publisherId) {
  if (!offerId || !publisherId) {
    throw new Error("offerId and publisherId are required.");
  }

  return await offerAssignmentRepository.createAssignment(offerId, publisherId);
}

export async function updateAssignmentStatus(id, status) {
  const allowed = ["PENDING", "APPROVED", "REJECTED"];

  if (!allowed.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${allowed.join(", ")}`);
  }

  return await offerAssignmentRepository.updateAssignmentStatus(id, status);
}

export async function deleteAssignment(id) {
  return await offerAssignmentRepository.deleteAssignment(id);
}
