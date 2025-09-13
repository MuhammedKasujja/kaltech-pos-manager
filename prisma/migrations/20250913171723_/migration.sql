-- AlterTable
ALTER TABLE "SyncDevice" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastSyncDate" TIMESTAMP(3);
