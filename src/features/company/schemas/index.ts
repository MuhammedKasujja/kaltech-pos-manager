import { z } from "zod";

export const changePasswordSchema = z.object({
  accountKey: z.string().min(8).trim(),
  password: z.string().min(8).trim(),
  confirmPassword: z.string().min(8).trim(),
});

export type ChangeAdminPasswordType = z.infer<typeof changePasswordSchema>;