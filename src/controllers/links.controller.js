import {
  fetchAllLinks,
  fetchLinkById,
  fetchLinkClicks,
  addLink,
} from "../services/links.service.js";

export const getLinks = async (req, res) => {
  const links = await fetchAllLinks();

  res.status(200).json({
    success: true,
    data: links,
  });
};

export const getLinkById = async (req, res) => {
  const { id } = req.params;

  const link = await fetchLinkById(id);

  if (!link) {
    return res.status(404).json({
      success: false,
      message: "Link not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: link,
  });
};

export const createLink = async (req, res) => {
  const { title, destinationUrl } = req.body;

  if (!title || !destinationUrl) {
    return res.status(400).json({
      success: false,
      message: "Title and destination URL are required",
    });
  }

  const link = await addLink({
    title,
    destinationUrl,

    isActive: true,

    clicks: 0,
    visitors: 0,
    conversions: 0,

    mobileClicks: 0,
    desktopClicks: 0,
    tabletClicks: 0,

    topCountry: "No data",
  });

  return res.status(201).json({
    success: true,
    message: "Link created successfully",
    data: link,
  });
};
export const redirectLink = async (req, res) => {
  const { shortCode } = req.params;

  const link = await trackLinkClick(shortCode);

  if (!link) {
    return res.status(404).send("Link not found");
  }

  return res.redirect(link.destinationUrl);
};

export const getLinkClicks = async (req, res) => {
  const { id } = req.params;

  const clicks = await fetchLinkClicks(id);

  return res.status(200).json({
    success: true,
    data: clicks,
  });
};
