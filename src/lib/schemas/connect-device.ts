import { z } from "zod";

export const registerSynceDeviceWithAccountSchema = z.object({
  userId: z.string().trim(),
  accountKey: z.string().trim(),
  deviceId: z.string().trim(),
  userName: z.string().trim(),
  adminEmail: z.string().email().trim(),
  adminPassword: z.string().trim(),
});

export type RegisterSynceDeviceWithAccountDto = z.infer<
  typeof registerSynceDeviceWithAccountSchema
>;
