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

export const addPixel = async ({
  linkId,
  pixelName,
  isActive,
  pixelType = "JAVASCRIPT",
}) => {
  const existingPixel = await findPixelByLinkId(linkId);

  if (existingPixel) {
    throw new Error("Pixel already exists for this link.");
  }

  const pixel = await createPixelRecord({
    linkId,
    pixelName,
    pixelType,
    isActive,
  });
  console.log("APP_URL =", process.env.APP_URL);
  let pixelCode = "";

  if (pixel.pixelType === "JAVASCRIPT") {
    pixelCode = `<script>
  (function () {
    const clickId = new URLSearchParams(window.location.search).get("clickId");

    if (!clickId) return;

    const img = new Image(1, 1);
    img.style.display = "none";
    img.src =
      "${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId=" +
      encodeURIComponent(clickId);

    if (document.body) {
      document.body.appendChild(img);
    } else {
      window.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(img);
      });
    }
  })();
  </script>`;
  } else if (pixel.pixelType === "IMAGE") {
    pixelCode = `<img src="${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId={CLICK_ID}" width="1" height="1" style="display:none;" />`;
  } else if (pixel.pixelType === "POSTBACK") {
    pixelCode = `${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId={CLICK_ID}`;
  }

  await updatePixelRecord(linkId, {
    pixelCode,
  });

  return await findPixelByLinkId(linkId);
};

export const updatePixel = async (linkId, data) => {
  const pixel = await findPixelByLinkId(linkId);

  if (!pixel) {
    throw new Error("Pixel not found.");
  }

  let pixelCode = pixel.pixelCode;

  if (data.pixelType) {
    if (data.pixelType === "JAVASCRIPT") {
      pixelCode = `<script>
(function () {
  const clickId = new URLSearchParams(window.location.search).get("clickId");

  if (!clickId) return;

  const img = new Image(1, 1);
  img.style.display = "none";
  img.src =
    "${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId=" +
    encodeURIComponent(clickId);

  if (document.body) {
    document.body.appendChild(img);
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(img);
    });
  }
})();
</script>`;
    } else if (data.pixelType === "IMAGE") {
      pixelCode = `<img src="${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId={CLICK_ID}" width="1" height="1" style="display:none;" />`;
    } else if (data.pixelType === "POSTBACK") {
      pixelCode = `${process.env.APP_URL}/api/pixels/track/${pixel.pixelToken}?clickId={CLICK_ID}`;
    }
  }

  return updatePixelRecord(linkId, {
    ...data,
    pixelCode,
  });
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

  const clicks = await prisma.click.findMany({
    take: 5,
    orderBy: {
      clickedAt: "desc",
    },
  });

  console.log("Latest clicks:", clicks.map(c => c.clickId));

  const click = clicks.find((c) => c.clickId === clickId);

  console.log("Requested clickId:", JSON.stringify(clickId));
  console.log("Matched Click:", click);
  console.log("Requested clickId:", JSON.stringify(clickId));
  console.log("DB Click:", click);

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
