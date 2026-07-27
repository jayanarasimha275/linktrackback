import {
  fetchPixelByLinkId,
  addPixel,
  updatePixel,
  deletePixel,
  trackConversion,
} from "../services/pixel.service.js";

export const getPixelByLinkId = async (req, res) => {
  try {
    const { linkId } = req.params;

    const pixel = await fetchPixelByLinkId(linkId);

    if (!pixel) {
      return res.status(404).json({
        success: false,
        message: "Pixel not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: pixel,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pixel.",
    });
  }
};

export const createPixel = async (req, res) => {
  try {
    const {
      linkId,
      pixelName,
      pixelType = "JAVASCRIPT",
      isActive = true,
    } = req.body;

    const pixel = await addPixel({
      linkId,
      pixelName,
      pixelType,
      isActive,
    });

      console.log("Created Pixel:", pixel);
    return res.status(201).json({
      success: true,
      message: "Pixel created successfully.",
      data: pixel,
    });
  } catch (error) {
    if (error.message === "Pixel already exists for this link.") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create pixel.",
    });
  }
};

export const updatePixelController = async (req, res) => {
  try {
    const { linkId } = req.params;

    const pixel = await updatePixel(linkId, req.body);

    return res.status(200).json({
      success: true,
      message: "Pixel updated successfully.",
      data: pixel,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update pixel.",
    });
  }
};

export const deletePixelController = async (req, res) => {
  try {
    const { linkId } = req.params;

    await deletePixel(linkId);

    return res.status(200).json({
      success: true,
      message: "Pixel deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete pixel.",
    });
  }
};

export const trackPixelConversion = async (req, res) => {
  try {
    const { token } = req.params;
    const { clickId } = req.query;

    await trackConversion(token, clickId);

    const pixel = Buffer.from(
      "R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",
      "base64",
    );

    res.setHeader("Content-Type", "image/gif");
    res.send(pixel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
