import prisma from "../prisma";
import { CreateDataUpdateDto } from "../schemas/data-upload";

export async function createDataUpload(data: CreateDataUpdateDto) {
  const account = await prisma.account.findFirstOrThrow({
    where: { accountKey: data.accountKey },
  });

  const device = await prisma.syncDevice.findFirstOrThrow({
    where: { deviceId: data.deviceId },
  });

  const update = await prisma.dataUpload.create({
    data: {
      accountKey: account.accountKey,
      deviceId: device.deviceId,
      userId: data.userId,
      updateId: data.updateId,
      data: data.data,
    },
  });

  return update;
}
