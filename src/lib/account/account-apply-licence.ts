import { DateTime } from "luxon";
import { kTrialPlanDays } from "../constants";
import { z } from "zod";
import prisma from "@/lib/prisma";

const applyLicenceKeySchema = z.object({
  licenceKey: z.string().min(1),
  accountKey: z.string().min(1),
});

export async function applyLicenceKey({
  licenceKey,
  accountKey,
}: z.infer<typeof applyLicenceKeySchema>) {
  
  const account = await prisma.account.findFirstOrThrow({
    where: { accountKey },
  });

  return {
    trialStarted: DateTime.now(),
    planStarted: DateTime.now(),
    trialDuration: kTrialPlanDays,
    trialDaysLeft: kTrialPlanDays,
    planExpires: DateTime.now().plus({ days: kTrialPlanDays }),
  };
}
