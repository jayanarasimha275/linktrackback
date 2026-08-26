import * as offerCategoryService from "../services/offerCategoryService.js";

export async function getOfferCategories(req, res) {
  try {
    const categories = await offerCategoryService.getOfferCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch offer categories." });
  }
}

export async function createOfferCategory(req, res) {
  try {
    const category = await offerCategoryService.createOfferCategory(req.body.name);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Failed to create category." });
  }
}
