import z from "zod";
import { checkPassword } from "@/lib/utils";
import prisma from "../prisma";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginType = z.infer<typeof loginSchema>;

export async function useSystemLogin({ email, password }: LoginType) {
  const user = await prisma.user.findFirstOrThrow({ where: { email } });

  const isValid = await checkPassword(password, user.password);

  if (!isValid) {
    throw new Error("Please check your details");
  }

  return user;
}
