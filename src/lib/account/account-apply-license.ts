import { DateTime } from "luxon";
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

  const licence = await prisma.licence.findFirst({
    where: {
      licenceKey,
      isApplied: false,
      account: {
        accountKey,
      },
    },
    include: {
      account: true,
    },
  });

  if (!licence) {
    throw Error("Invalid license key please check and try again");
  }

  const systemDate = DateTime.now();

  const currentDataTime = systemDate.toJSDate();

  const verifiedAccount = await prisma.account.update({
    where: { id: licence.account.id },
    data: {
      trialStarted: currentDataTime,
      planStarted: currentDataTime,
      trialDuration: licence?.days,
      planExpires: systemDate.plus({ days: licence?.days }).toJSDate(),
    },
  });

  await prisma.licence.update({
    where: { id: licence?.id },
    data: {
      isApplied: true,
      appliedAt: currentDataTime,
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
