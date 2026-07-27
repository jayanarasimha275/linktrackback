import { trackLinkClick } from "./links.service.js";

export const findTrackingLink = async (shortCode, req, visitorId) => {
  const result = await trackLinkClick(shortCode, req, visitorId);

  if (!result) {
    return null;
  }

  const { link, click } = result;

  if (!link.isActive) {
    return null;
  }

  return {
    link,
    click,
  };
};
