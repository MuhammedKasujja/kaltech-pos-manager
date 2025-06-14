-- DropForeignKey
ALTER TABLE `DataUpload` DROP FOREIGN KEY `DataUpload_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `SyncDevice` DROP FOREIGN KEY `SyncDevice_accountId_fkey`;

-- DropIndex
DROP INDEX `DataUpload_accountId_fkey` ON `DataUpload`;

-- DropIndex
DROP INDEX `SyncDevice_accountId_fkey` ON `SyncDevice`;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `companyAdminId` INTEGER NULL,

    UNIQUE INDEX `Company_email_key`(`email`),
    UNIQUE INDEX `Company_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CompanyAdmin_email_key`(`email`),
    UNIQUE INDEX `CompanyAdmin_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DataUpload` ADD CONSTRAINT `DataUpload_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SyncDevice` ADD CONSTRAINT `SyncDevice_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_companyAdminId_fkey` FOREIGN KEY (`companyAdminId`) REFERENCES `CompanyAdmin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
