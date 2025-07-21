-- DropForeignKey
ALTER TABLE "DataUploadDevice" DROP CONSTRAINT "DataUploadDevice_dataUploadId_fkey";

-- DropForeignKey
ALTER TABLE "DataUploadDevice" DROP CONSTRAINT "DataUploadDevice_uploadDeviceId_fkey";

-- AddForeignKey
ALTER TABLE "DataUploadDevice" ADD CONSTRAINT "DataUploadDevice_dataUploadId_fkey" FOREIGN KEY ("dataUploadId") REFERENCES "DataUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataUploadDevice" ADD CONSTRAINT "DataUploadDevice_uploadDeviceId_fkey" FOREIGN KEY ("uploadDeviceId") REFERENCES "SyncDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
