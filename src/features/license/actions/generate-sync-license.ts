"use server";

import prisma from "@/lib/prisma";
import { generateLicenceKey } from "@/lib/utils";
import { SubscriptionType } from "@prisma/client";
import { DateTime } from "luxon";

export async function generateDataSyncLicense({
  accountKey,
  subscriptionId,
}: {
  accountKey: string;
  subscriptionId: number;
}) {
  return generateLicense({
    accountKey,
    subscriptionId,
    licenseType: SubscriptionType.DATA_SYNC,
  });
}

export async function generateAccountLicence({
  accountKey,
  subscriptionId,
}: {
  accountKey: string;
  subscriptionId: number;
}) {
  return generateLicense({
    accountKey,
    subscriptionId,
    licenseType: SubscriptionType.ACCOUNT_SETUP,
  });
}


export async function generateLicense({
  accountKey,
  subscriptionId,
  licenseType,
}: {
  accountKey: string;
  subscriptionId: number;
  licenseType: SubscriptionType;
}) {
  const account = await prisma.account.findFirst({
    where: {
      accountKey,
      deletedAt: null,
    },
  });
  if (!account) {
    throw new Error("Account not found");
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      deletedAt: null,
      type: licenseType,
    },
  });

  if (!subscription) {
    throw new Error("Subscription plan not found");
  }

  const oldLicense = await prisma.licence.findFirst({
    where: {
      deletedAt: null,
      subscription: {
        id: subscription.id,
        type: licenseType,
      },
      account: {
        accountKey: account.accountKey,
      },
    },
  });

  let licenseCreateFlag = false;

  if (
    oldLicense !== null &&
    oldLicense.isApplied &&
    oldLicense.appliedAt !== null
  ) {
    const appliedAt = DateTime.fromJSDate(oldLicense.appliedAt);
    const expiryDate = appliedAt.plus({ days: oldLicense.days });

    const currentSystemDate = DateTime.now();
    // check if the license is already running
    if (currentSystemDate.diff(expiryDate).milliseconds < 0) {
      throw new Error("Subscription already Activated");
    } else {
      /// if this license expired, allow creating a new license
      licenseCreateFlag = true;
      /// soft delete the license to avoid usage in the future once the license expires
      prisma.licence.update({
        where: { id: oldLicense.id },
        data: { deletedAt: DateTime.now().toJSDate() },
      });
    }
  }

  if (oldLicense === null) {
    licenseCreateFlag = true;

    // soft delete all Account previous licenses to ensure only a single active subscription plan exists
    await prisma.licence.updateMany({
      where: {
        subscription: {
          type: licenseType,
        },
        account: {
          accountKey: account.accountKey,
        },
      },
      data: {
        deletedAt: DateTime.now().toJSDate(),
      },
    });
  }

  return licenseCreateFlag
    ? await prisma.licence.create({
        data: {
          licenceKey: generateLicenceKey(),
          accountId: account.id,
          days: subscription.planDays,
          subscriptionId: subscription.id,
        },
      })
    : oldLicense;
}
