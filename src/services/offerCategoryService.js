import * as offerCategoryRepository from "../repositories/offerCategoryRepository.js";

export async function getOfferCategories() {
  return await offerCategoryRepository.getOfferCategories();
}

export async function createOfferCategory(name) {
  if (!name || !name.trim()) {
    throw new Error("Category name is required.");
  }

  return await offerCategoryRepository.createOfferCategory(name.trim());
}
