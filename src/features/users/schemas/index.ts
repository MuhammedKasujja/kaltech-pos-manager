import { z } from "zod";

export const createUserSchema = z.object({
  age: z.coerce.number().min(1),
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8).trim(),
});

export type CreateSystemUserType = z.infer<typeof createUserSchema>;
