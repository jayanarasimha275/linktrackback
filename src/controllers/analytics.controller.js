import { getLinkAnalytics } from "../services/analytics.service.js";

export const fetchLinkAnalytics = async (req, res) => {
  try {
    const { linkId } = req.params;

    const analytics = await getLinkAnalytics(linkId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
