import * as offerService from "../services/offerService.js";

export async function getOffers(req, res) {
  try {
    const offers = await offerService.getOffers();

    res.status(200).json(offers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch offers.",
    });
  }
}

export async function getOffer(req, res) {
  try {
    const { id } = req.params;

    const offer = await offerService.getOffer(id);

    if (!offer) {
      return res.status(404).json({
        message: "Offer not found.",
      });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch offer.",
    });
  }
}

export async function createOffer(req, res) {
  try {
    const offer = await offerService.createOffer(req.body);

    res.status(201).json(offer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create offer.",
    });
  }
}

export async function updateOffer(req, res) {
  try {
    const { id } = req.params;

    const offer = await offerService.updateOffer(
      id,
      req.body
    );

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update offer.",
    });
  }
}

export async function deleteOffer(req, res) {
  try {
    const { id } = req.params;

    await offerService.deleteOffer(id);

    res.status(200).json({
      message: "Offer deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete offer.",
    });
  }
}
