"use server";

import prisma from "@/lib/prisma";
import {
  AccountSetupSubscriptionType,
  DataSyncSubscriptionType,
} from "../schemas";
import { SubscriptionType } from "@prisma/client";

export async function createAccountSubscriptionPlan(
  data: AccountSetupSubscriptionType
) {
  return prisma.subscription.create({
    data: { ...data, type: SubscriptionType.ACCOUNT_SETUP },
  });
}

export async function createDataSyncronizationSubscription(
  data: DataSyncSubscriptionType
) {
  return prisma.subscription.create({
    data: { ...data, type: SubscriptionType.DATA_SYNC },
  });
}
