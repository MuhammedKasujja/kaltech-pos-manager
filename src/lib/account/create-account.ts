import { Account } from "@prisma/client";
import { CreateAccountRequest } from "../schemas/account";
import prisma from "../prisma";
import { DateTime } from "luxon";
import { kTrialPlanDays } from "@/lib/constants";
import { AccountPlan } from "../types/enums";
import { generateAccountKey, hashPassword } from "@/lib/utils";

export async function createCompanyAccount({
  user,
  company,
}: CreateAccountRequest): Promise<Account> {
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

  return account;
}
