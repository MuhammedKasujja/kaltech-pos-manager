import { DateTime } from "luxon";
import { DEFAULT_TRIAL_PLAN_DAYS } from "../constants";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const applyLicenceKeySchema = z.object({
  licenceKey: z.string().min(1),
  accountKey: z.string().min(1),
});

export async function applyLicenceKey({
  licenceKey,
  accountKey,
}: z.infer<typeof applyLicenceKeySchema>) {
  const account = await prisma.account.findFirst({
    where: {
      accountKey,
      licence: {
        some: {
          licenceKey: licenceKey,
        },
      },
    },
    include: {
      licence: true,
    },
  });

  if (!account) {
    throw Error("Invalid licence key please check and try again");
  }

  const licence = account.licence.at(0);

  const verifiedAccount = await prisma.account.update({
    where: { id: account.id },
    data: {
      trialStarted: DateTime.now().toUTC().toJSDate(),
      planStarted: DateTime.now().toUTC().toJSDate(),
      trialDuration: licence?.days,
      planExpires: DateTime.now()
        .plus({ days: licence?.days })
        .toUTC()
        .toJSDate(),
    },
  });

  return {
    trialStarted: verifiedAccount.trialStarted,
    planStarted: verifiedAccount.planStarted,
    trialDuration: verifiedAccount.trialDuration,
    trialDaysLeft: verifiedAccount.trialDuration,
    planExpires: verifiedAccount.planExpires,
  };
}
