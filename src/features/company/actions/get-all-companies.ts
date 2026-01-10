import "server-only";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/auth/verify-session";
import { GetAccountsSchema } from "@/features/accounts/types";
import { Prisma } from "@prisma/client";

export async function getCompanies(input: GetAccountsSchema) {
  await verifySession();
  const { page, perPage, search } = input;

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(perPage)));
  const skip = (safePage - 1) * safePageSize;

  // Build dynamic where clause
  // const where: any = {};
  const where: Prisma.CompanyWhereInput = {
    AND: [],
  };

  // Full/ Free text search (simple version - case insensitive)
  if (search?.trim()) {
    const searchTerm = search.trim();
    where.OR = [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { email: { contains: searchTerm, mode: "insensitive" } },
      { phone: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.company.findMany({
      where,
      skip,
      take: safePageSize,
      include: { admin: true, account: { include: { licence: true } } },
    }),

    prisma.company.count(),
  ]);

  const totalPages = Math.ceil(total / safePageSize);

  return { data: items, totalPages };
}
