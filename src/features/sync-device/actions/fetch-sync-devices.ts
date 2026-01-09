"server only";
import prisma from "@/lib/prisma";
import { SyncDevice } from "@prisma/client";

export type SyncDeviceDetail = Awaited<ReturnType<typeof fetchSyncDevices>>[0];

export async function fetchSyncDevices() {
  return await prisma.syncDevice.findMany({
    include: {
      account: {
        include: {
          company: {},
        },
      },
    },
  });
}

export async function fetchAccountSyncDevices({
  accountKey,
}: {
  accountKey: string;
}): Promise<SyncDevice[]> {
  return await prisma.syncDevice.findMany({
    where: { account: { accountKey } },
  });
}

export async function findSyncDeviceByDeviceId({
  accountKey,
  deviceId,
}: {
  accountKey: string;
  deviceId: string;
}): Promise<SyncDevice> {
  const device = await prisma.syncDevice.findFirst({
    where: {
      deviceId: deviceId,
      account: { accountKey: accountKey },
    },
  });

  if (device == null) {
    throw new Error("Sync Device not recognized");
  }

  return device;
}
