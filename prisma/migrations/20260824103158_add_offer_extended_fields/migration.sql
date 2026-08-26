-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "alertAffiliates" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "appId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "dailyScheduleEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dailyStartTime" TEXT,
ADD COLUMN     "dailyStopTime" TEXT,
ADD COLUMN     "deepLink" TEXT,
ADD COLUMN     "externalOfferId" TEXT,
ADD COLUMN     "hidePayout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "payoutModel" TEXT,
ADD COLUMN     "privateNote" TEXT,
ADD COLUMN     "revenueCurrency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "revenueModel" TEXT,
ADD COLUMN     "targetingRules" JSONB,
ADD COLUMN     "terms" TEXT,
ADD COLUMN     "termsKpi" TEXT;

-- CreateTable
CREATE TABLE "OfferCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfferCategory_name_key" ON "OfferCategory"("name");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OfferCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
