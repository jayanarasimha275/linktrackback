-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "visitorId" TEXT,
    "cookieId" TEXT,
    "browser" TEXT,
    "operatingSystem" TEXT,
    "deviceType" TEXT,
    "country" TEXT,
    "city" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Click_linkId_idx" ON "Click"("linkId");

-- CreateIndex
CREATE INDEX "Click_visitorId_idx" ON "Click"("visitorId");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
