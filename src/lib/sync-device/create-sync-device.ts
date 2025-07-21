"use server";
import prisma from "../prisma";
import { CreateSyncDeviceDto } from "../schemas/sync-device";
import { revalidatePath } from "next/cache";

export async function createSyncDevice(data: CreateSyncDeviceDto) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const device = await prisma.syncDevice.upsert({
    create: {
      userId: data.userId,
      userName: data.userName,
      accountId: account.id,
      deviceId: data.deviceId,
    },
    update: {
      userId: data.userId,
      userName: data.userName,
    },
    where: {
      deviceId: data.deviceId,
      account: { accountKey: account.accountKey },
    },
  });
  revalidatePath("admin/sync-devices");
  return device;
}
