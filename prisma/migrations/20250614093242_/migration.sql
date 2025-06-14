/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyAdminId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyAdminId` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_companyAdminId_fkey`;

-- DropIndex
DROP INDEX `Company_companyAdminId_fkey` ON `Company`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `companyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Company` MODIFY `companyAdminId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_companyId_key` ON `Account`(`companyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Company_companyAdminId_key` ON `Company`(`companyAdminId`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_companyAdminId_fkey` FOREIGN KEY (`companyAdminId`) REFERENCES `CompanyAdmin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
