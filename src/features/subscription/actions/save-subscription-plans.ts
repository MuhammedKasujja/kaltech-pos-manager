"use server";

import prisma from "@/lib/prisma";
import {
  AccountSetupSubscriptionType,
  DataSyncSubscriptionType,
} from "../schemas";
import { SubscriptionPlan, SubscriptionType } from "@prisma/client";

export async function createAccountSubscriptionPlan(
  data: AccountSetupSubscriptionType
) {
  const { id, ...rest } = data;

  const subscription = {
    ...rest,
    type: SubscriptionType.ACCOUNT_SETUP,
    maxSyncDevices: 0,
    features: data.features.map((ele) => ele.value),
  };

  return prisma.subscription.upsert({
    where: { id: id ?? 0 },
    update: { ...subscription },
    create: { ...subscription },
  });
}

export async function createDataSyncSubscription(
  data: DataSyncSubscriptionType
) {
  const { id, ...rest } = data;

  const subscription = {
    ...rest,
    type: SubscriptionType.DATA_SYNC,
    plan: SubscriptionPlan.PRO,
    features: data.features.map((ele) => ele.value),
  };

  return prisma.subscription.upsert({
    where: { id: id ?? 0 },
    update: { ...subscription },
    create: { ...subscription },
  });
}
