"use server";

import prisma from "@/lib/prisma";
import {
  AccountSetupSubscriptionType,
  DataSyncSubscriptionType,
} from "../schemas";
import { SubscriptionPlan, SubscriptionType } from "@prisma/client";

export async function createAccountSubscriptionPlan(
  data: Omit<AccountSetupSubscriptionType, "id">
) {
  return prisma.subscription.create({
    data: {
      ...data,
      type: SubscriptionType.ACCOUNT_SETUP,
      maxSyncDevices: 0,
      features: data.features.map((ele) => ele.value),
    },
  });
}

export async function createDataSyncronizationSubscription(
  data: Omit<DataSyncSubscriptionType, "id">
) {
  return prisma.subscription.create({
    data: {
      ...data,
      type: SubscriptionType.DATA_SYNC,
      plan: SubscriptionPlan.PRO,
      features: data.features.map((ele) => ele.value),
    },
  });
}
