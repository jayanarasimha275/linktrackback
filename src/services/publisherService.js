import {
  findAllPublishers,
  findPublisherById,
  findPublisherByEmail,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../repositories/publisherRepository.js";

export async function getPublishers() {
  return findAllPublishers();
}

export async function getPublisher(id) {
  const publisher = await findPublisherById(id);

  if (!publisher) {
    throw new Error("Publisher not found.");
  }

  return publisher;
}

export async function addPublisher(data) {
  const existingPublisher = await findPublisherByEmail(data.email);

  if (existingPublisher) {
    throw new Error("Publisher with this email already exists.");
  }

  return createPublisher(data);
}

export async function editPublisher(id, data) {
  await getPublisher(id);

  if (data.email) {
    const existingPublisher = await findPublisherByEmail(data.email);

    if (existingPublisher && existingPublisher.id !== id) {
      throw new Error("Email already in use.");
    }
  }

  return updatePublisher(id, data);
}

export async function removePublisher(id) {
  await getPublisher(id);

  return deletePublisher(id);
}
