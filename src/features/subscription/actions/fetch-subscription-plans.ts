"use server";

import prisma from "@/lib/prisma";
import { SubscriptionType } from "@prisma/client";

export async function fetchAccountSetupSubscriptionPlans() {
  return prisma.subscription.findMany({
    where: { type: SubscriptionType.ACCOUNT_SETUP },
  });
}

export async function fetchDataSyncSubscriptionPlans() {
  return prisma.subscription.findMany({
    where: { type: SubscriptionType.DATA_SYNC },
  });
}
