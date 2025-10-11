"use server";

import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { Prisma, SubscriptionType } from "@prisma/client";
import { companyQuery } from "../types";

export type CompanyDetailPreview = Prisma.CompanyGetPayload<
  typeof companyQuery
>;

export async function getCompanyDetails(accountKey: string) {
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
