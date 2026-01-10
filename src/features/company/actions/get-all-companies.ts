import "server-only";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/auth/verify-session";
import { GetAccountsSchema } from "@/features/accounts/types";

export async function getCompanies(input: GetAccountsSchema) {
  await verifySession();
  const { page, perPage } = input;

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(perPage)));
  const skip = (safePage - 1) * safePageSize;

  const [items, total] = await Promise.all([
    prisma.company.findMany({
      skip,
      take: safePageSize,
      include: { admin: true, account: { include: { licence: true } } },
    }),

    prisma.company.count(),
  ]);

  const totalPages = Math.ceil(total / safePageSize);

  return { data: items, totalPages };
}
