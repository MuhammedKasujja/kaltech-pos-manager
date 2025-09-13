"use server";

import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const companyQuery = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: {
    admin: true,
    account: { include: { licence: true, devices: true } },
  },
});

export type CompanyDetailPreview = Prisma.CompanyGetPayload<
  typeof companyQuery
>;

export async function getCompanyDetails(accountKey: string) {
  await verifySession();

  return await prisma.company.findFirstOrThrow({
    where: { account: { accountKey } },
    include: {
      admin: true,
      account: { include: { licence: true, devices: true } },
    },
  });
}
