import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { FetchDataUploadsDto } from "../schemas";
import { findAccountWithDataSyncByKey } from "@/features/accounts/actions";
import { findSyncDeviceByDeviceId } from "@/features/sync-device/actions";
import { systemDateTime } from "@/lib/utils";
import { formatDataUploadList } from "../utils/format-data";
import { EntityUpload, GetDataUploadsSchema } from "../types";

export type DataUploadDetail = Awaited<
  ReturnType<typeof fetchDataUploads>
>["data"][0];

export async function fetchDataUploads(input: GetDataUploadsSchema) {
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

  return { data: updates, totalPages: 5 };
}

export async function fetchAccountDataUploads(data: FetchDataUploadsDto) {
  const account = await findAccountWithDataSyncByKey({
    accountKey: data.accountKey,
  });

  const device = await findSyncDeviceByDeviceId({
    deviceId: data.deviceId,
    accountKey: account.accountKey,
  });

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

  return updates.flatMap((update) => ({
    ...update,
    data: formatDataUploadList(update.data as EntityUpload[]),
  }));
}

export function flattenData(updates: DataUploadDetail[]) {
  const flattened = updates.flatMap((item) => item.data);
  return flattened;
}

async function updateDeviceLastSyncDate({ deviceId }: { deviceId: number }) {
  const deviceLastSyncDate = systemDateTime.toJSDate();

  return prisma.syncDevice.update({
    where: { id: deviceId },
    data: { lastSyncDate: deviceLastSyncDate },
  });
}
