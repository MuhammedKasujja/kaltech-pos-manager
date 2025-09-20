import prisma from "@/lib/prisma";
import { Account, SubscriptionType } from "@prisma/client";

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
    where: { accountKey },
  });

  if (!account) {
    throw new Error("Account details not found");
  }
  
  // TODO: need to check if the license is still valid using [appliedAt] field plus license days against current DateTime
  const license = await prisma.licence.findFirst({
    where: {
      accountId: account.id,
      deletedAt: null,
      subscription: { deletedAt: null, type: SubscriptionType.DATA_SYNC },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!license) {
    throw new Error(
      "Data syncronization is not allowed for this Account, Please contact admin."
    );
  }

  return account;
}
