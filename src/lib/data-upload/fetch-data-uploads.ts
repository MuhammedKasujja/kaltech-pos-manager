import { verifySession } from "../auth/verify-session";
import prisma from "../prisma";
import { FetchDataUploadsDto } from "../schemas/data-upload";

export async function fetchDataUploads() {
  await verifySession();
  // await prisma.dataUpload.deleteMany()
  const updates = await prisma.dataUpload.findMany({
    orderBy: { createdAt: "desc" },
  });

  return updates;
}

export async function fetchAccountDataUploads(data: FetchDataUploadsDto) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account Key not found");
  }

  const device = await prisma.syncDevice.findFirst({
    where: {
      deviceId: data.deviceId,
      account: { accountKey: account.accountKey },
    },
  });

  if (device == null) {
    throw new Error("Sync Device not Registered");
  }

  const updates = await prisma.dataUpload.findMany({
    where: {
      accountId: account.id,
      uploads: {
        none: { uploadDeviceId: device.id },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  for (const update of updates) {
    await prisma.dataUploadDevice.create({
      data: { dataUploadId: update.id, uploadDeviceId: device.id },
    });
  }

  // const flattenedData = updates.flatMap((item) => item.data);

  return updates;
}
