-- CreateEnum
CREATE TYPE "PixelType" AS ENUM ('JAVASCRIPT', 'IMAGE', 'POSTBACK');

-- AlterTable
ALTER TABLE "pixels" ADD COLUMN     "pixelType" "PixelType" NOT NULL DEFAULT 'JAVASCRIPT';
