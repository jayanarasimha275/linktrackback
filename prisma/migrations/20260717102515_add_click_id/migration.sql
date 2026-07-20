/*
  Warnings:

  - A unique constraint covering the columns `[clickId]` on the table `Click` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "clickId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Click_clickId_key" ON "Click"("clickId");
