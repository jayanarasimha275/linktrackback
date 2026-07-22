import { fetchDashboardAnalytics } from "../services/dashboard.service.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const dashboard = await fetchDashboardAnalytics(req.user.id);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard analytics",
    });
  }
};
