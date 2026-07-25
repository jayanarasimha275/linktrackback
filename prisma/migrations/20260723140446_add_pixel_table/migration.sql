-- CreateTable
CREATE TABLE "pixels" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "pixelName" TEXT NOT NULL,
    "pixelCode" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pixels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pixels_linkId_key" ON "pixels"("linkId");

-- AddForeignKey
ALTER TABLE "pixels" ADD CONSTRAINT "pixels_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
