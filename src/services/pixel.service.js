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
  const pixelCode = `<script>
  (function () {
    const clickId = new URLSearchParams(window.location.search).get("clickId");

    if (!clickId) return;

    const img = new Image();
    img.src =
      "${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId=" +
      encodeURIComponent(clickId);
  })();
  </script>`;

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
  console.log("========== PIXEL TRACK ==========");
  console.log("Pixel Token:", pixelToken);
  console.log("Click ID:", clickId);

  const pixel = await findPixelByToken(pixelToken);
  console.log("Pixel Found:", pixel);

  if (!pixel || !pixel.isActive) {
    console.log("❌ Pixel not found or inactive");
    return;
  }

  const click = await prisma.click.findUnique({
    where: {
      clickId,
    },
  });

  console.log("Click Found:", click);

  if (!click) {
    console.log("❌ Click not found");
    return;
  }

  if (click.linkId !== pixel.linkId) {
    console.log("❌ Click does not belong to this link");
    return;
  }

  if (click.converted) {
    console.log("❌ Click already converted");
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

  console.log("✅ Click marked as converted");

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

  console.log("✅ Link conversion count incremented");
  console.log("========== END ==========");
};
