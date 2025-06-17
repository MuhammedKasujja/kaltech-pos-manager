import "server-only"

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/auth/verify-session";

export async function getAllAccounts() {
  await verifySession()

  const accounts = await prisma.account.findMany({
    include: { company: true },
  });
  return accounts;
}
