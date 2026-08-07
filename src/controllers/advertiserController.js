import {
  getAdvertisers,
  getAdvertiser,
  addAdvertiser,
  editAdvertiser,
  removeAdvertiser,
} from "../services/advertiserService.js";

export async function getAllAdvertisers(req, res, next) {
  try {
    const advertisers = await getAdvertisers();

    res.json({
      success: true,
      count: advertisers.length,
      data: advertisers,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdvertiserById(req, res, next) {
  try {
    const advertiser = await getAdvertiser(req.params.id);

    res.json({
      success: true,
      data: advertiser,
    });
  } catch (err) {
    next(err);
  }
}

export async function createAdvertiser(req, res, next) {
  try {
    const advertiser = await addAdvertiser(req.body);

    res.status(201).json({
      success: true,
      message: "Advertiser created successfully.",
      data: advertiser,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAdvertiser(req, res, next) {
  try {
    const advertiser = await editAdvertiser(req.params.id, req.body);

    res.json({
      success: true,
      message: "Advertiser updated successfully.",
      data: advertiser,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdvertiser(req, res, next) {
  try {
    await removeAdvertiser(req.params.id);

    res.json({
      success: true,
      message: "Advertiser deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}
