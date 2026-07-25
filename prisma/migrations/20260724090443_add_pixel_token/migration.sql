/*
  Warnings:

  - A unique constraint covering the columns `[pixelToken]` on the table `pixels` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pixels" ADD COLUMN     "pixelToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "pixels_pixelToken_key" ON "pixels"("pixelToken");
