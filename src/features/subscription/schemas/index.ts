import { SubscriptionPlan } from "@prisma/client";
import { z } from "zod";

export const accountSetupSubscriptionSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1).trim(),
  features: z.array(z.object({ value: z.string() })),
  plan: z.nativeEnum(SubscriptionPlan),
  enabledModules: z.coerce.number().optional(),
  tagline: z.string().min(1).trim(),
  planDays: z.coerce.number(),
  monthylyPrice: z.coerce.number(),
  yearlyPrice: z.coerce.number(),
  oldYearlyPrice: z.coerce.number(),
  oldMonthlyPrice: z.coerce.number(),
  deletedAt: z.date().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type AccountSetupSubscriptionType = z.infer<
  typeof accountSetupSubscriptionSchema
>;

export const dataSyncSubscriptionSchema = z.object({
  ...accountSetupSubscriptionSchema.shape,
  plan: z.nativeEnum(SubscriptionPlan).optional(),
  maxSyncDevices: z.coerce.number(),
});

export type DataSyncSubscriptionType = z.infer<
  typeof dataSyncSubscriptionSchema
>;
