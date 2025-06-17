"use server";
import z from "zod";
import prisma from "../prisma";
import { createSyncDeviceSchema } from "../schemas/sync-device";
import { revalidatePath } from "next/cache";

export async function createSyncDevice(
  data: z.infer<typeof createSyncDeviceSchema>
) {
  const account = await prisma.account.findFirstOrThrow({
    where: { accountKey: data.accountKey },
  });

  const device = await prisma.syncDevice.create({
    data: {
      userId: data.userId,
      userName: data.userName,
      accountId: account.id,
      deviceId: data.deviceId,
    },
  });
  revalidatePath("admin/sync-devices");
  return device;
}
