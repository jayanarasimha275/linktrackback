import { trackLinkClick } from "./links.service.js";

export const findTrackingLink = async (shortCode, req, visitorId) => {
  const link = await trackLinkClick(shortCode, req, visitorId);

  if (!link) {
    return null;
  }

  if (!link.isActive) {
    return null;
  }

  return link;
};
