/*
  Warnings:

  - You are about to drop the column `account_key` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `DataUpload` table. All the data in the column will be lost.
  - You are about to drop the column `upload_id` on the `DataUpload` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `DataUpload` table. All the data in the column will be lost.
  - You are about to drop the column `account_key` on the `SyncDevice` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `SyncDevice` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `SyncDevice` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `SyncDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountKey` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountKey` to the `DataUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `DataUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateId` to the `DataUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DataUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountKey` to the `SyncDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `SyncDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SyncDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `SyncDevice_device_id_key` ON `SyncDevice`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `account_key`,
    DROP COLUMN `expires_at`,
    ADD COLUMN `accountKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiresAt` INTEGER NULL;

-- AlterTable
ALTER TABLE `DataUpload` DROP COLUMN `device_id`,
    DROP COLUMN `upload_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `accountKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateId` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SyncDevice` DROP COLUMN `account_key`,
    DROP COLUMN `device_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `accountKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SyncDevice_deviceId_key` ON `SyncDevice`(`deviceId`);
