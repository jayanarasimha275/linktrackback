/*
  Warnings:

  - Made the column `pixelToken` on table `pixels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pixels" ALTER COLUMN "pixelToken" SET NOT NULL;
