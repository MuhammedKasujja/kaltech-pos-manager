"use server";

import { findAccountByKey } from "@/features/accounts/actions";
import prisma from "@/lib/prisma";
import { SubscriptionType } from "@prisma/client";

export async function fetchAccountLicenses({
  accountKey,
}: {
  accountKey?: string;
}) {
  const account = await findAccountByKey({ accountKey: accountKey });

  const activation = await fetchActivationLicense({
    accountKey: account.accountKey,
  });

  const subscription = await fetchDataSyncronizationLicense({
    accountKey: account.accountKey,
  });

  return {
    activation,
    subscription,
  };
}

// TODO: filter out expired licenses
export async function fetchActivationLicense({
  accountKey,
}: {
  accountKey: string;
}) {
  const activationLicense = await prisma.licence.findFirst({
    where: {
      deletedAt: null,
      account: { accountKey },
      subscription: { type: SubscriptionType.ACCOUNT_SETUP },
    },
  });

  if (!activationLicense) {
    throw Error("Account has now recognized");
  }
  return activationLicense;
}

// TODO: filter out expired licenses
export async function fetchDataSyncronizationLicense({
  accountKey,
}: {
  accountKey: string;
}) {
  return prisma.licence.findFirst({
    where: {
      deletedAt: null,
      account: { accountKey },
      subscription: { type: SubscriptionType.DATA_SYNC },
    },
  });
}
