import { Account, Prisma } from "@prisma/client";
import { CreateAccountRequest } from "../schemas/account";
import prisma from "../prisma";
import { DateTime } from "luxon";
import {
  kTrialPlanDays,
  kDefaultPaymentMethod,
  kLatestVersion,
} from "@/lib/constants";
import { AccountPlan } from "../types/enums";
import {
  generateAccountKey,
  generateRandomString,
  hashPassword,
} from "@/lib/utils";

const query = Prisma.validator<Prisma.AccountDefaultArgs>()({
  include: {
    company: {
      include: {
        admin: true,
      },
    },
  },
});

type AccountResponse = Prisma.AccountGetPayload<typeof query>;

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
      trialDuration: kTrialPlanDays,
      planExpires: DateTime.now()
        .plus({ days: kTrialPlanDays })
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
    key: account.accountKey,
    latestVersion: kLatestVersion,
    isVerifiedAccount: account.isVerifiedAccount,
    isTrial: account.isTrial,
    trialStarted: account.trialStarted,
    planStarted: account.planStarted,
    trialDuration: account.trialDuration,
    trialDaysLeft: account.trialDuration,
    planExpires: account.planExpires,
    reportErrors: true,
    referralCode: generateRandomString(10),
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
      paymentTypeId: kDefaultPaymentMethod,
    },
  };
}
