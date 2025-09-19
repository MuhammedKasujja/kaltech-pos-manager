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

  if (licence.isApplied) {
    throw Error("License key already used");
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
      isTrial: false,
      isVerifiedAccount: true,
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
    trialDaysLeft: 0, //verifiedAccount.trialDuration,
    isTrial: verifiedAccount.isTrial,
    planExpires: verifiedAccount.planExpires,
    isVerifiedAccount: verifiedAccount.isVerifiedAccount,
    accountPlan: verifiedAccount.plan,
  };
}
