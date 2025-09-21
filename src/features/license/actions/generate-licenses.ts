"use server";

import { findAccountByKey } from "@/features/accounts/actions";
import { isSubscriptionActive } from "@/features/subscription/util";
import prisma from "@/lib/prisma";
import { generateLicenceKey, systemDateTime } from "@/lib/utils";
import { Subscription, SubscriptionType } from "@prisma/client";

export async function generateDataSyncLicense({
  accountKey,
  subscriptionId,
}: {
  accountKey: string;
  subscriptionId: number;
}) {
  const result = await verifySubscriptionLicense({
    accountKey,
    subscriptionId,
    licenseType: SubscriptionType.DATA_SYNC,
  });
  if (result.exists) return result.license;

  return createDataSyncSubscription({
    accountId: result.accountId,
    subscription: result.subscription,
  });
}

export async function generateAccountLicence({
  accountKey,
  subscriptionId,
}: {
  accountKey: string;
  subscriptionId: number;
}) {
  const result = await verifySubscriptionLicense({
    accountKey,
    subscriptionId,
    licenseType: SubscriptionType.ACCOUNT_SETUP,
  });

  if (result.exists) return result.license;

  return createAccountActivationPlan({
    subscription: result.subscription,
    accountId: result.accountId,
  });
}

async function verifySubscriptionLicense({
  accountKey,
  subscriptionId,
  licenseType,
}: {
  accountKey: string;
  subscriptionId: number;
  licenseType: SubscriptionType;
}) {
  const account = await findAccountByKey({ accountKey });

  if (!account || account.deletedAt !== null) {
    throw new Error("Account is already dactivated");
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

  let createLicenseFlag = false;

  if (
    oldLicense !== null &&
    oldLicense.isApplied &&
    oldLicense.appliedAt !== null
  ) {
    // check if the license is already running
    if (
      isSubscriptionActive({
        appliedAt: oldLicense.appliedAt,
        subDays: oldLicense.days,
      })
    ) {
      throw new Error("Subscription already Activated");
    } else {
      /// if this license expired, allow creating a new license
      createLicenseFlag = true;
      /// soft delete the license to avoid usage in the future once the license expires
      prisma.licence.update({
        where: { id: oldLicense.id },
        data: { deletedAt: systemDateTime.toJSDate() },
      });
    }
  }

  if (oldLicense === null) {
    createLicenseFlag = true;

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
        deletedAt: systemDateTime.toJSDate(),
      },
    });
  }

  return createLicenseFlag
    ? ({
        exists: false,
        accountId: account.id,
        subscription: subscription,
      } as const)
    : ({ exists: true, license: oldLicense } as const);
}

/**
 * Create a data syncronization plan and activate it
 *
 * @param accountId
 * @param subscription Subscription
 * @returns
 */
async function createDataSyncSubscription({
  accountId,
  subscription,
}: {
  accountId: number;
  subscription: Subscription;
}) {
  return await prisma.licence.create({
    data: {
      licenceKey: generateLicenceKey(),
      accountId: accountId,
      days: subscription.planDays,
      subscriptionId: subscription.id,
      isApplied: true,
      appliedAt: systemDateTime.toJSDate(),
    },
  });
}

/**
 * Create Account Activation plan
 *
 * @param accountId number
 * @param subscription Subscription
 * @returns
 */
async function createAccountActivationPlan({
  accountId,
  subscription,
}: {
  accountId: number;
  subscription: Subscription;
}) {
  return await prisma.licence.create({
    data: {
      licenceKey: generateLicenceKey(),
      accountId: accountId,
      days: subscription.planDays,
      subscriptionId: subscription.id,
    },
  });
}
