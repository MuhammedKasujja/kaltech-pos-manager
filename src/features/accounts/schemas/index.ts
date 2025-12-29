import z from "zod";

export const CreateAccountSchema = z.object({
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string().nullable(),
  }),
  company: z.object({
    name: z.string(),
    email: z.string().email().nullable(),
    phone: z.string(),
  }),
});

export type CreateAccountRequest = z.infer<typeof CreateAccountSchema>;

export const accountEnabledModuleSchema = z.object({
  accountKey: z.string(),
  enabledModules: z.number(),
});

export const syncAccountModulesSchema = z.object({
  accountKey: z.string(),
});
