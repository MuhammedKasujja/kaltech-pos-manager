"use server";

import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { SubscriptionType } from "@prisma/client";

export type AccountDetailPreview = Awaited<
  ReturnType<typeof getAccountDetails>
>;

export async function getAccountDetails(accountKey: string) {
  await verifySession();

  return await prisma.company.findFirstOrThrow({
    where: { account: { accountKey } },
    include: {
      admin: true,
      account: {
        include: {
          licence: {
            orderBy: { createdAt: "desc" },
            take: 1,
            where: { subscription: { type: SubscriptionType.ACCOUNT_SETUP } },
          },
          devices: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });
}