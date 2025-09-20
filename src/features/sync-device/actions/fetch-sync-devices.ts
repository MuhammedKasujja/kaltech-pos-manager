"server only";
import prisma from "@/lib/prisma";
import { Prisma, SyncDevice } from "@prisma/client";

export const deviceQuery = Prisma.validator<Prisma.SyncDeviceDefaultArgs>()({
  include: { account: { include: { company: {} } } },
});

export type SyncDeviceDetail = Prisma.SyncDeviceGetPayload<typeof deviceQuery>;

export async function fetchSyncDevices(): Promise<SyncDeviceDetail[]> {
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
