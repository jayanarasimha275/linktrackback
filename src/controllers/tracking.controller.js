import { findTrackingLink } from "../services/tracking.service.js";

import { v4 as uuidv4 } from "uuid";

export const redirectTrackingLink = async (req, res) => {
  try {
    const { shortCode } = req.params;

    let visitorId = req.cookies.trackflow_visitor;

    if (!visitorId) {
      visitorId = uuidv4();

      res.cookie("trackflow_visitor", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
    }

    const link = await findTrackingLink(shortCode, req, visitorId);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Tracking link not found or inactive",
      });
    }

    return res.redirect(302, link.destinationUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
