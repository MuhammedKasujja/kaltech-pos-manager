import { z } from "zod";

export const systemUserSchema = z.object({
  id: z.coerce.number().optional(),
  age: z.coerce.number().min(1),
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8).trim(),
});

export type SystemUserType = z.infer<typeof systemUserSchema>;
