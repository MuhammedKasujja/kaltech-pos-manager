-- AlterTable
ALTER TABLE "DataUpload" ALTER COLUMN "updateId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "DataUploadDevice" (
    "uploadDeviceId" INTEGER NOT NULL,
    "dataUploadId" INTEGER NOT NULL,

    CONSTRAINT "DataUploadDevice_pkey" PRIMARY KEY ("uploadDeviceId","dataUploadId")
);

-- AddForeignKey
ALTER TABLE "DataUploadDevice" ADD CONSTRAINT "DataUploadDevice_dataUploadId_fkey" FOREIGN KEY ("dataUploadId") REFERENCES "DataUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataUploadDevice" ADD CONSTRAINT "DataUploadDevice_uploadDeviceId_fkey" FOREIGN KEY ("uploadDeviceId") REFERENCES "SyncDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
