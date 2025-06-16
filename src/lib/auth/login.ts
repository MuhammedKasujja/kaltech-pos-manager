"use server";

import prisma from "../prisma";
import { checkPassword } from "../utils";

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

  return user;
}
