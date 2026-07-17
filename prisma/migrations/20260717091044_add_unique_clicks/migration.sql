/*
  Warnings:

  - You are about to drop the column `fingerprint` on the `Click` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "fingerprint";

-- AlterTable
ALTER TABLE "links" ADD COLUMN     "uniqueClicks" INTEGER NOT NULL DEFAULT 0;
