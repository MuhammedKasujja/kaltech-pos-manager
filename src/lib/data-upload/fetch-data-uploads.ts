import { verifySession } from "../auth/verify-session";
import prisma from "../prisma";
import { FetchDataUploadsDto } from "../schemas/data-upload";

export async function fetchDataUploads() {
  await verifySession();
  const updates = await prisma.dataUpload.findMany();

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

  return await prisma.dataUpload.findMany({
    where: {
      accountId: account.id,
    },
    orderBy: { createdAt: "desc" },
  });
}
