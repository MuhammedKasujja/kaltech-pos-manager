/*
  Warnings:

  - Added the required column `days` to the `Licence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Licence` ADD COLUMN `days` INTEGER NOT NULL;
