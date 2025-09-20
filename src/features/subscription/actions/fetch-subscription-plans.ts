"use server";

import prisma from "@/lib/prisma";
import { SubscriptionType } from "@prisma/client";
// import { cacheTag } from "next/dist/server/use-cache/cache-tag";
// import {
//   getAccountSubscriptionGlobalTag,
//   getDataSubscriptionGlobalTag,
// } from "../cache";

export async function fetchAccountSetupSubscriptionPlans() {
  // "use cache";
  // cacheTag(getAccountSubscriptionGlobalTag());
  return prisma.subscription.findMany({
    where: { type: SubscriptionType.ACCOUNT_SETUP },
    orderBy: { createdAt: "asc" },
  });
}

export async function fetchDataSyncSubscriptionPlans() {
  // "use cache";
  // cacheTag(getDataSubscriptionGlobalTag());
  return prisma.subscription.findMany({
    where: { type: SubscriptionType.DATA_SYNC },
    orderBy: { createdAt: "asc" },
  });
}
