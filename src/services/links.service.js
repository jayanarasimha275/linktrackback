import { generateShortCode } from "../utils/generateShortCode.js";

import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

import {
  findAllLinks,
  findLinkById,
  findLinkByShortCode,
  findClicksByLinkId,
  createLinkRecord,
  incrementLinkClicks,
  incrementUniqueVisitors,
  createClickRecord,
  findUniqueVisitorClick,
} from "../repositories/link.repository.js";

export const fetchAllLinks = async () => {
  return findAllLinks();
};

export const fetchLinkById = async (id) => {
  return findLinkById(id);
};
export const fetchLinkClicks = async (id) => {
  return findClicksByLinkId(id);
};
export const fetchLinkByShortCode = async (shortCode) => {
  return findLinkByShortCode(shortCode);
};

export const addLink = async ({
  title,
  destinationUrl,
  isActive,
  clicks,
  visitors,
  conversions,
  mobileClicks,
  desktopClicks,
  tabletClicks,
  topCountry,
}) => {
  let shortCode;
  let existingLink;

  do {
    shortCode = generateShortCode();
    existingLink = await findLinkByShortCode(shortCode);
  } while (existingLink);

  return createLinkRecord({
    title,
    shortCode,
    destinationUrl,

    isActive,

    clicks,
    visitors,
    conversions,

    mobileClicks,
    desktopClicks,
    tabletClicks,

    topCountry,
  });
};

export const trackLinkClick = async (shortCode, req, visitorId) => {
  const link = await findLinkByShortCode(shortCode);

  if (!link) {
    return null;
  }

  // Increment total clicks
  await incrementLinkClicks(link.id);

  // Parse browser/device
  const parser = new UAParser(req.get("user-agent"));
  const result = parser.getResult();

  console.log("UA Result:", result);
  console.log("Browser:", result.browser);
  // Detect location
  const geo = geoip.lookup(req.ip);

  const country = geo?.country || "Unknown";
  const city = geo?.city || "Unknown";

  // Check if this visitor already clicked this link
  const existingVisitor = await findUniqueVisitorClick(link.id, visitorId);

  const isUnique = !existingVisitor;

  console.log("=================================");
  console.log("Short Code:", shortCode);
  console.log("Link ID:", link.id);
  console.log("Visitor ID:", visitorId);
  console.log("Existing Visitor:", existingVisitor);
  console.log("Is Unique:", isUnique);
  console.log("=================================");

  // Increment unique visitors only once
  if (isUnique) {
    console.log("Incrementing visitors...");

    await incrementUniqueVisitors(link.id);

    console.log("Visitors incremented.");
  }
  console.log("Data being saved:", {
    browser: result.browser.name || "Unknown",
    browserVersion: result.browser.version || "Unknown",
  });

  const click = await createClickRecord({
    linkId: link.id,
    visitorId,
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    browser: result.browser.name || "Unknown",
    browserVersion: result.browser.version || "Unknown",
    operatingSystem: result.os.name || "Unknown",
    deviceType: result.device.type || "Desktop",
    country,
    city,
    referrer: req.get("referer") || req.get("referrer") || "Direct",
    isUnique,
  });

  console.log("Saved Click:", click);

  return link;
};
