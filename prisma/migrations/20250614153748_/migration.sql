/*
  Warnings:

  - You are about to alter the column `id` on the `SyncDevice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `SyncDevice` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropIndex
DROP INDEX `SyncDevice_id_key` ON `SyncDevice`;
