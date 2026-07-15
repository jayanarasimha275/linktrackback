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

  await incrementLinkClicks(link.id);

  const parser = new UAParser(req.get("user-agent"));

  const result = parser.getResult();
  const geo = geoip.lookup(req.ip);

  const country = geo?.country || "Unknown";
  const city = geo?.city || "Unknown";

  const existingVisitor = await findUniqueVisitorClick(link.id, visitorId);

  const isUnique = !existingVisitor;

  await createClickRecord({
    linkId: link.id,

    visitorId,

    ipAddress: req.ip,

    userAgent: req.get("user-agent"),

    browser: result.browser.name || "Unknown",

    operatingSystem: result.os.name || "Unknown",

    deviceType: result.device.type || "Desktop",

    country,

    city,

    isUnique,
  });

  return link;
};
