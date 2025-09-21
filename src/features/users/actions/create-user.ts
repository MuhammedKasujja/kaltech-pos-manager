"use server";

import { CreateSystemUserType } from "@/features/users/schemas";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

export async function createSystemUser(data: CreateSystemUserType) {
  const encryptedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: { ...data, password: encryptedPassword },
  });
  return user;
}
