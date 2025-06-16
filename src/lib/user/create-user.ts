"use server";

import prisma from "../prisma";
import { CreateSystemUserType } from "../schemas/user";

export async function createSystemUser(data: CreateSystemUserType) {
  const user = await prisma.user.create({ data });
  return user;
}
