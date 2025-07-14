import "server-only";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/auth/verify-session";

export async function getAllCompanies() {
  await verifySession();

  const companies = await prisma.company.findMany({
    include: { admin: true, account: { include: { licence: true } } },
  });
  return companies;
}
