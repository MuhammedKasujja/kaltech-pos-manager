import prisma from "../prisma";
import { CreateDataUpdateDto } from "../schemas/data-upload";

export async function createDataUpload(data: CreateDataUpdateDto) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account Key not found");
  }

  const device = await prisma.syncDevice.findFirst({
    where: { deviceId: data.deviceId },
  });

  if (device == null) {
    throw new Error("Sync Device not Registered");
  }

  const update = await prisma.dataUpload.create({
    data: {
      accountKey: account.accountKey,
      deviceId: device.deviceId,
      userId: data.userId,
      updateId: data.updateId,
      data: data.data,
      accountId: account.id,
    },
  });

  return update;
}
