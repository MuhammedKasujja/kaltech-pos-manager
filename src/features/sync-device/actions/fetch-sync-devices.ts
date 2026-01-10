"server only";
import prisma from "@/lib/prisma";
import { SyncDevice } from "@prisma/client";
import { GetSyncDevicesSchema } from "../types";

export type SyncDeviceDetail = Awaited<
  ReturnType<typeof getSyncDevices>
>["data"][0];

export async function getSyncDevices(input: GetSyncDevicesSchema) {
  const { page, perPage } = input;

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(perPage)));
  const skip = (safePage - 1) * safePageSize;

  const [items, total] = await Promise.all([
    prisma.syncDevice.findMany({
      skip,
      take: safePageSize,
      include: {
        account: {
          include: {
            company: {},
          },
        },
      },
    }),
    prisma.syncDevice.count(),
  ]);

  const totalPages = Math.ceil(total / safePageSize);

  return { data: items, totalPages };
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
