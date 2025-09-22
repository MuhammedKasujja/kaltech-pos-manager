import { Prisma } from "@prisma/client";
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

export const uploadQuery = Prisma.validator<Prisma.DataUploadDefaultArgs>()({
  include: { account: { include: { company: {} } } },
});

export const accountDataUploadQuery =
  Prisma.validator<Prisma.DataUploadDefaultArgs>()({
    include: {
      account: { include: { company: {} } },
      uploads: { include: { device: {} } },
    },
  });

export type AccountDataUploadType = Prisma.DataUploadGetPayload<
  typeof accountDataUploadQuery
>;

export type EntityUpload = {
  state: string;
  entity: string;
  entityId: string;
  data: {
    updated_at?: string;
    updatedAt: string;
  };
};
