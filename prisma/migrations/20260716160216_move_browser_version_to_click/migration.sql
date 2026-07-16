/*
  Warnings:

  - You are about to drop the column `browserVersion` on the `links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "browserVersion" TEXT;

-- AlterTable
ALTER TABLE "links" DROP COLUMN "browserVersion";
