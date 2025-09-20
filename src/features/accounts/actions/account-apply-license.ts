import { z } from "zod";
import prisma from "@/lib/prisma";
import { SubscriptionPlan, SubscriptionType } from "@prisma/client";
import { systemDateTime } from "@/lib/utils";

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
      deletedAt: null,
      account: {
        accountKey,
      },
      subscription: {
        type: SubscriptionType.ACCOUNT_SETUP,
      },
    },
    include: {
      account: true,
      subscription: true,
    },
  });

  if (!licence) {
    throw Error("Invalid license key please check and try again");
  }

  if (licence.isApplied) {
    throw Error("License key already used");
  }

  const systemDate = systemDateTime;

  const currentDataTime = systemDate.toJSDate();

  const isTrial =
    licence.subscription === null ||
    licence.subscription?.plan == SubscriptionPlan.TRIAL;

  const verifiedAccount = await prisma.account.update({
    where: { id: licence.account.id },
    data: {
      trialStarted: currentDataTime,
      planStarted: currentDataTime,
      trialDuration: isTrial ? (licence?.days ?? 0) : 0,
      planExpires: systemDate.plus({ days: licence?.days }).toJSDate(),
      isTrial: isTrial,
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
    trialDaysLeft: verifiedAccount.trialDuration,
    isTrial: verifiedAccount.isTrial,
    planExpires: verifiedAccount.planExpires,
    isVerifiedAccount: verifiedAccount.isVerifiedAccount,
    accountPlan: verifiedAccount.plan.toLowerCase(),
  };
}
