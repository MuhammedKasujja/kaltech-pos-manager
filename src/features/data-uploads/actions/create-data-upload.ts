import prisma from "@/lib/prisma";
import { generateRandomString } from "@/lib/utils";
import { CreateDataUpdateDto } from "../schemas";

export async function createDataUpload(data: CreateDataUpdateDto) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account details not found");
  }

  const device = await prisma.syncDevice.findFirst({
    where: {
      deviceId: data.deviceId,
      account: { accountKey: account.accountKey },
    },
  });

  if (device == null) {
    throw new Error("Sync Device not recognized");
  }

  if (device.isActive === false) {
    throw new Error("Sync Device is already deactivated");
  }

  const nextUpdateId = generateRandomString(16).toUpperCase();

  const update = await prisma.dataUpload.create({
    data: {
      accountKey: account.accountKey,
      deviceId: device.deviceId,
      userId: data.userId,
      updateId: nextUpdateId,
      data: data.data,
      accountId: account.id,
    },
  });

  await prisma.dataUploadDevice.create({
    data: {
      uploadDeviceId: device.id,
      dataUploadId: update.id,
    },
  });

  const { createdAt: lastSyncDate } = update;

  return { lastSyncDate, lastUpdateId: nextUpdateId };
}
