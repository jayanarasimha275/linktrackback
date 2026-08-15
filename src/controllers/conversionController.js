import { processConversion } from "../services/conversionService.js";

export async function handleConversion(req, res, next) {
  try {
    const { clickId } = req.body;

    if (!clickId) {
      return res.status(400).json({
        success: false,
        message: "clickId is required.",
      });
    }

    const result = await processConversion(clickId);

    return res.status(200).json({
      success: true,
      message: "Conversion recorded successfully.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
