import { z } from "zod";

export const createDataUpdateSchema = z.object({
  deviceId: z.string(),
  userId: z.string(),
  accountKey: z.string(),
  updateId: z.string(),
  data: z.array(z.object({}).passthrough()),
});

export type CreateDataUpdateDto = z.infer<typeof createDataUpdateSchema>;

export const fetchDataUploadsSchema = z.object({
  accountKey: z.string().min(1, "Account Key is required"),
  deviceId: z.string().min(1, "Device ID is required"),
});

export const fetchSyncDeviceSchema = z.object({
  accountKey: z.string().min(1, "Account Key is required"),
});

export type FetchDataUploadsDto = z.infer<typeof fetchDataUploadsSchema>;
