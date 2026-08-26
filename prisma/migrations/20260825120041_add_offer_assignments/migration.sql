-- CreateTable
CREATE TABLE "OfferAssignment" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OfferAssignment_offerId_idx" ON "OfferAssignment"("offerId");

-- CreateIndex
CREATE INDEX "OfferAssignment_publisherId_idx" ON "OfferAssignment"("publisherId");

-- CreateIndex
CREATE UNIQUE INDEX "OfferAssignment_offerId_publisherId_key" ON "OfferAssignment"("offerId", "publisherId");

-- AddForeignKey
ALTER TABLE "OfferAssignment" ADD CONSTRAINT "OfferAssignment_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferAssignment" ADD CONSTRAINT "OfferAssignment_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
