"use server";

import prisma from "@/lib/prisma";
import { checkPassword } from "@/lib/utils";
import { createSession } from "@/lib/session";
import { getUserDTO } from "../dto/user-dto";
import { tryCatch } from "../try-catch";

async function login({ email, password }: { email: string; password: string }) {
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

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const [user, error] = await tryCatch(login({ email, password }));

  if (error) {
    return { error: error.message, success: false };
  }
  return { data: user, success: true };
}
