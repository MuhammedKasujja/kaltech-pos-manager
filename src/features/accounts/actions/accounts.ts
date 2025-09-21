import { isSubscriptionActive } from "@/features/subscription/util";
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
 * Returns Account if `Data Syncronization` feature is enabled
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

  const license = await prisma.licence.findFirst({
    where: {
      accountId: account.id,
      deletedAt: null,
      isApplied: true,
      subscription: { deletedAt: null, type: SubscriptionType.DATA_SYNC },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!license) {
    throw new Error(
      "Data syncronization is disabled for this Account, Please contact admin."
    );
  }

  if (
    !isSubscriptionActive({
      appliedAt: license.appliedAt,
      subDays: license.days,
    })
  ) {
    throw new Error("Data syncronization expired, Please contact admin.");
  }

  return account;
}
