"use server";
import prisma from "@/lib/prisma";
import { generateRandomString } from "../utils";

function generateLicence() {
  return generateRandomString(24).toUpperCase();
}

export async function generateCompanyLicence(accountKey: string) {
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
      licenceKey: generateLicence(),
      accountId: account.id,
      days: 60,
    },
  });

  return licence;
}
