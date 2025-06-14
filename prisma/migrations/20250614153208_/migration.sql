/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `SyncDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `SyncDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SyncDevice` ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SyncDevice_userName_key` ON `SyncDevice`(`userName`);
