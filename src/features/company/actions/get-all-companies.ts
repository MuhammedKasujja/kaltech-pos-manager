import "server-only";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/auth/verify-session";
import { GetAccountsSchema } from "@/features/accounts/types";

export async function getCompanies(input: GetAccountsSchema) {
  await verifySession();
  const { page, perPage, search, filters } = input;

  const companies = await prisma.company.findMany({
    include: { admin: true, account: { include: { licence: true } } },
  });
  return { data: companies };
}
