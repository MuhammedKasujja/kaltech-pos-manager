"use server";
import prisma from "@/lib/prisma";
import { systemDateTime } from "@/lib/utils";
import { findAccountByKey } from "./accounts";

/// soft delete the account in case of future re-activation
export async function deleteAccount(accountId: number) {
  const account = await prisma.account.update({
    where: { id: accountId },
    data: {
      deletedAt: systemDateTime.toJSDate(),
    },
  });

  // TODO: de-activate all subscriptions

  return account;
}

export async function forceDeleteAccount(accountKey: string) {
  try {
    const account = await findAccountByKey({ accountKey });
    await prisma.licence.deleteMany({ where: { accountId: account.id } });
    await prisma.dataUpload.deleteMany({ where: { accountId: account.id } });
    await prisma.account.delete({ where: { id: account.id } });
    await prisma.company.delete({ where: { id: account.companyId } });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
