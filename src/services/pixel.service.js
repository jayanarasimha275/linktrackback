import prisma from "../config/prisma.js";

import {
  findPixelByLinkId,
  findPixelByToken,
  createPixelRecord,
  updatePixelRecord,
  deletePixelRecord,
} from "../repositories/pixel.repository.js";

export const fetchPixelByLinkId = async (linkId) => {
  return findPixelByLinkId(linkId);
};

export const addPixel = async ({ linkId, pixelName, isActive }) => {
  const existingPixel = await findPixelByLinkId(linkId);

  if (existingPixel) {
    throw new Error("Pixel already exists for this link.");
  }

  const pixel = await createPixelRecord({
    linkId,
    pixelName,
    isActive,
  });

  console.log("APP_URL =", process.env.APP_URL);
  const pixelCode = `${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId={CLICK_ID}`;

  await updatePixelRecord(linkId, {
    pixelCode,
  });

  return await findPixelByLinkId(linkId);
};

export const updatePixel = async (linkId, data) => {
  return updatePixelRecord(linkId, data);
};

export const deletePixel = async (linkId) => {
  return deletePixelRecord(linkId);
};

export const trackConversion = async (pixelToken, clickId) => {
  const pixel = await findPixelByToken(pixelToken);

  if (!pixel || !pixel.isActive) {
    return;
  }

  const click = await prisma.click.findUnique({
    where: {
      clickId,
    },
  });

  if (!click || click.converted) {
    return;
  }

  await prisma.click.update({
    where: {
      clickId,
    },
    data: {
      converted: true,
    },
  });

  await prisma.link.update({
    where: {
      id: pixel.linkId,
    },
    data: {
      conversions: {
        increment: 1,
      },
    },
  });
};
