"use server";
import prisma from "@/lib/prisma";
import { DateTime } from "luxon";

/// soft delete the account in case of future re-activation
export async function deleteAccount(accountId: number) {
  const account = await prisma.account.update({
    where: { id: accountId },
    data: {
      deletedAt: DateTime.now().toJSDate(),
    },
  });

  // TODO: de-activate all subscriptions

  return account;
}
