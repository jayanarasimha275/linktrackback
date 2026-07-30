import * as offerRepository from "../repositories/offerRepository.js";

export async function getOffers() {
  return await offerRepository.getOffers();
}

export async function getOffer(id) {
  return await offerRepository.getOffer(id);
}

export async function createOffer(data) {
  return await offerRepository.createOffer(data);
}

export async function updateOffer(id, data) {
  return await offerRepository.updateOffer(id, data);
}

export async function deleteOffer(id) {
  return await offerRepository.deleteOffer(id);
}
