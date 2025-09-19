"use server";
import prisma from "@/lib/prisma";

export async function deleteAccount(accountId: number) {
  const account = await prisma.account.delete({
    where: { id: accountId },
  });

  const company = await prisma.company.delete({
    where: { id: account.companyId },
  });

  await prisma.companyAdmin.delete({
    where: { id: company.companyAdminId },
  });

  return account;
}
