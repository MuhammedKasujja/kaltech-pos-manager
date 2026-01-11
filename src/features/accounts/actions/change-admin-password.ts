"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { ChangeAdminPasswordType } from "../schemas";

export async function changeAdminPassword(data: ChangeAdminPasswordType) {
  const encryptedPassword = await hashPassword(data.password);

  const admin = await prisma.companyAdmin.findFirst({
    where: {
      company: { account: { accountKey: data.accountKey } },
    },
  });

  if (!admin) throw new Error("Admin not found");

  await prisma.companyAdmin.update({
    where: { id: admin?.id },
    data: { password: encryptedPassword },
  });

  return admin;
}
