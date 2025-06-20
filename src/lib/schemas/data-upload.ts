import { z } from "zod";

export const createDataUpdateSchema = z.object({
  deviceId: z.string(),
  userId: z.string(),
  accountKey: z.string(),
  updateId: z.number(),
  data: z.array(z.object({}).passthrough()),
});

export type CreateDataUpdateDto = z.infer<typeof createDataUpdateSchema>;
