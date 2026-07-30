import {
  findAllAdvertisers,
  findAdvertiserById,
  createAdvertiser,
  updateAdvertiser,
  deleteAdvertiser,
} from "../repositories/advertiserRepository.js";

export async function getAdvertisers() {
  return findAllAdvertisers();
}

export async function getAdvertiser(id) {
  const advertiser = await findAdvertiserById(id);

  if (!advertiser) {
    throw new Error("Advertiser not found.");
  }

  return advertiser;
}

export async function addAdvertiser(data) {
  return createAdvertiser(data);
}

export async function editAdvertiser(id, data) {
  await getAdvertiser(id);

  return updateAdvertiser(id, data);
}

export async function removeAdvertiser(id) {
  await getAdvertiser(id);

  return deleteAdvertiser(id);
}
