import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
