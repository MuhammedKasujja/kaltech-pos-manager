import { z } from "zod";

export const changePasswordSchema = z
  .object({
    accountKey: z.string().min(8).trim(),
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangeAdminPasswordType = z.infer<typeof changePasswordSchema>;
