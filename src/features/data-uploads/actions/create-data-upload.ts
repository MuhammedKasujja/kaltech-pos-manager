import prisma from "@/lib/prisma";
import { generateRandomString } from "@/lib/utils";
import { CreateDataUpdateDto } from "../schemas";
import { findAccountWithDataSyncByKey } from "@/features/accounts/actions";
import { findSyncDeviceByDeviceId } from "@/features/sync-device/actions";

export async function createDataUpload(data: CreateDataUpdateDto) {
  const account = await findAccountWithDataSyncByKey({
    accountKey: data.accountKey,
  });

  const device = await findSyncDeviceByDeviceId({
    deviceId: data.deviceId,
    accountKey: account.accountKey,
  });

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
