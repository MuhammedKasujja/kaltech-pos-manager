/*
  Warnings:

  - You are about to drop the column `about` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "about",
DROP COLUMN "tags",
ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT '';
