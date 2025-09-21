"use server";
import { findAccountWithDataSyncByKey } from "@/features/accounts/actions";
import { CreateSyncDeviceDto } from "@/features/sync-device/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSyncDevice(data: CreateSyncDeviceDto) {
  const account = await findAccountWithDataSyncByKey({
    accountKey: data.accountKey,
  });

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
