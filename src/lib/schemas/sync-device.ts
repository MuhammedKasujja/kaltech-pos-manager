import { z } from "zod";

export const createSyncDeviceSchema = z.object({
  userId: z.string(),
  accountKey: z.string(),
  deviceId: z.string(),
  userName: z.string(),
});

export type CreateSyncDeviceDto = z.infer<typeof createSyncDeviceSchema>