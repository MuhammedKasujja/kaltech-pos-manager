"use server";

import prisma from "@/lib/prisma";
import { checkPassword } from "@/lib/utils";
import { createSession } from "@/lib/session";
import { getUserDTO } from "../dto/user-dto";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("Please check login details");
  }

  const isValid = await checkPassword(password, user.password);

  if (!isValid) {
    throw new Error("Please check login details");
  }

  await createSession(user.id.toString());

  return await getUserDTO(user.id);
}
