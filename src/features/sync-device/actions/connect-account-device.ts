"use server";
import { RegisterSynceDeviceWithAccountDto } from "@/features/sync-device/schemas";
import prisma from "@/lib/prisma";
import { checkPassword } from "@/lib/utils";

export async function connectAccountDevice(
  data: RegisterSynceDeviceWithAccountDto,
) {
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const admin = await prisma.account.findFirst({
    where: {
      id: account.id,
      company: {
        admin: {
          email: data.adminEmail,
        },
      },
    },
    include: {
      company: {
        include: {
          admin: true,
        },
      },
    },
  });

  if (!admin) {
    throw new Error("Check Admin credentials, and try again");
  }

  const isPasswordValid = await checkPassword(
    data.adminPassword,
    admin?.company.admin.password,
  );

  if (!isPasswordValid) {
    throw new Error("Check Admin credentials, and try again");
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
  return device;
}
