import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { FetchDataUploadsDto } from "../schemas";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export const uploadQuery = Prisma.validator<Prisma.DataUploadDefaultArgs>()({
  include: { account: { include: { company: {} } } },
});

export type DataUploadDetail = Prisma.DataUploadGetPayload<typeof uploadQuery>;

export async function fetchDataUploads(): Promise<DataUploadDetail[]> {
  await verifySession();
  const updates = await prisma.dataUpload.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      account: {
        include: {
          company: {},
        },
      },
    },
  });

  return updates;
}

export async function fetchAccountDataUploads(data: FetchDataUploadsDto) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account Key not found");
  }

  const device = await prisma.syncDevice.findFirst({
    where: {
      deviceId: data.deviceId,
      account: { accountKey: account.accountKey },
    },
  });

  if (device == null) {
    throw new Error("Sync Device not Registered");
  }

  if (device.isActive === false) {
    throw new Error("Sync Device is already deactivated");
  }
  
  const updates = await prisma.dataUpload.findMany({
    where: {
      accountId: account.id,
      uploads: {
        none: { uploadDeviceId: device.id },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  for (const update of updates) {
    await prisma.dataUploadDevice.create({
      data: { dataUploadId: update.id, uploadDeviceId: device.id },
    });
  }

  updateDeviceLastSyncDate({ deviceId: device.id });

  // const flattenedData = updates.flatMap((item) => item.data);

  return updates;
}

export function flattenData(updates: DataUploadDetail[]) {
  const flattened = updates.flatMap((item) => item.data);
  return flattened;
}

async function updateDeviceLastSyncDate({ deviceId }: { deviceId: number }) {
  const deviceLastSyncDate = DateTime.now().toJSDate();

  return prisma.syncDevice.update({
    where: { id: deviceId },
    data: { lastSyncDate: deviceLastSyncDate },
  });
}
