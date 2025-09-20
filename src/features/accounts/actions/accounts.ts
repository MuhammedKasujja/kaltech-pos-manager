import prisma from "@/lib/prisma";
import { Account } from "@prisma/client";

export async function findAccountByKey({
  accountKey,
}: {
  accountKey?: string;
}): Promise<Account> {
  const account = await prisma.account.findFirst({
    where: { accountKey: accountKey },
  });

  if (!account) {
    throw new Error("Account details not found");
  }
  return account;
}

/**
 * Returns Account if `Data Syncronization` feature enabled
 * @param accountKey
 * @returns Account
 */
export async function findAccountWithDataSyncByKey({
  accountKey,
}: {
  accountKey?: string;
}): Promise<Account> {
  const account = await prisma.account.findFirst({
    where: { accountKey: accountKey },
  });

  if (!account) {
    throw new Error("Account details not found");
  }
  return account;
}
