"use server";
import prisma from "@/lib/prisma";
import { generateLicenceKey } from "@/lib/utils";

export async function generateAccountLicence(accountKey: string) {
  const account = await prisma.account.findFirst({
    where: {
      accountKey,
    },
  });
  if (!account) {
    throw new Error("Account not found");
  }

  const licence = await prisma.licence.create({
    data: {
      licenceKey: generateLicenceKey(),
      accountId: account.id,
      days: 60,
    },
  });

  return licence;
}
