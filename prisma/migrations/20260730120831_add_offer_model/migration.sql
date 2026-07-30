-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "offerName" TEXT NOT NULL,
    "advertiser" TEXT NOT NULL,
    "affiliate" TEXT,
    "advertiserPayout" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "affiliatePayout" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "previewUrl" TEXT,
    "trackingUrl" TEXT,
    "fallbackUrl" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'Public',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "geo" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "isp" TEXT,
    "assignedAffiliate" TEXT,
    "capType" TEXT NOT NULL DEFAULT 'Daily',
    "capValue" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);
