/*
  Warnings:

  - A unique constraint covering the columns `[trackingCode]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - The required column `trackingCode` was added to the `Campaign` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "trackingCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_trackingCode_key" ON "Campaign"("trackingCode");
