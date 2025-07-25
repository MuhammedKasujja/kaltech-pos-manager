"use server";
import prisma from "@/lib/prisma";
import { RegisterSynceDeviceWithAccountDto } from "@/lib/schemas/connect-device";
import { hashPassword } from "@/lib/utils";

export async function connectAccountDevice(
  data: RegisterSynceDeviceWithAccountDto
) {
    console.log({data})
  const account = await prisma.account.findFirst({
    where: { accountKey: data.accountKey },
  });

  if (!account) {
    throw new Error("Account not found");
  }
  const encryptedPassword = await hashPassword(data.adminPassword);
  
  const admin = await prisma.account.findFirst({
    where: {
      id: account.id,
      company: {
        admin: {
          email: data.adminEmail,
          password: encryptedPassword,
        },
      },
    },
  });

  if (!admin) {
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
