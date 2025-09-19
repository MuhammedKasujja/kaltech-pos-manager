import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { DateTime } from "luxon";
import {
  DEFAULT_TRIAL_PLAN_DAYS,
  DEFAULT_PAYMENT_METHOD,
  LATEST_APP_VERSION,
} from "@/lib/constants";
import { AccountPlan } from "../../../lib/types/enums";
import {
  generateAccountKey,
  generateRandomString,
  hashPassword,
} from "@/lib/utils";
import { CreateAccountRequest } from "@/features/accounts/schemas";

export const accountQuery = Prisma.validator<Prisma.AccountDefaultArgs>()({
  include: {
    company: {
      include: {
        admin: true,
      },
    },
  },
});

type AccountResponse = Prisma.AccountGetPayload<typeof accountQuery>;

export async function createCompanyAccount({
  user,
  company,
}: CreateAccountRequest) {
  const encryptedPassword = await hashPassword(user.password);

  const admin = await prisma.companyAdmin.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: encryptedPassword,
    },
  });

  const companyEntity = await prisma.company.create({
    data: {
      name: company.name,
      phone: company.phone,
      email: company.email,
      companyAdminId: admin.id,
    },
  });

  const accountKey = generateAccountKey();

  const account = await prisma.account.create({
    data: {
      accountKey: accountKey,
      companyId: companyEntity.id,
      isVerifiedAccount: true,
      isTrial: true,
      plan: AccountPlan.pro,
      trialStarted: DateTime.now().toUTC().toJSDate(),
      planStarted: DateTime.now().toUTC().toJSDate(),
      trialDuration: DEFAULT_TRIAL_PLAN_DAYS,
      planExpires: DateTime.now()
        .plus({ days: DEFAULT_TRIAL_PLAN_DAYS })
        .toUTC()
        .toJSDate(),
    },
  });

  const response = await prisma.account.findFirst({
    where: {
      id: account.id,
    },
    include: {
      company: {
        include: {
          admin: true,
        },
      },
    },
  });

  return accountResponse(response!);
}

function accountResponse(account: AccountResponse) {
  const admin = account.company.admin;
  return {
    plan: account.plan,
    accountKey: account.accountKey,
    latestVersion: LATEST_APP_VERSION,
    isVerifiedAccount: account.isVerifiedAccount,
    isTrial: account.isTrial,
    trialStarted: account.trialStarted,
    planStarted: account.planStarted,
    trialDuration: account.trialDuration,
    trialDaysLeft: account.trialDuration,
    planExpires: account.planExpires,
    reportErrors: true,
    referralCode: generateRandomString(10),
    paymentTypeId: DEFAULT_PAYMENT_METHOD,
    user: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phone,
    },
    company: {
      name: account.company.name,
      phone: account.company.phone,
      email: account.company.email,
    },
  };
}
