/*
  Warnings:

  - Added the required column `plan` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planExpires` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planStarted` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trialDuration` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trialStarted` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_companyAdminId_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `isTrial` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isVerifiedAccount` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `plan` VARCHAR(191) NOT NULL,
    ADD COLUMN `planExpires` DATETIME(3) NOT NULL,
    ADD COLUMN `planStarted` DATETIME(3) NOT NULL,
    ADD COLUMN `trialDuration` INTEGER NOT NULL,
    ADD COLUMN `trialStarted` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_companyAdminId_fkey` FOREIGN KEY (`companyAdminId`) REFERENCES `CompanyAdmin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
