"use server";

import { z } from "zod";
import { findAccountByKey } from "./accounts";
import prisma from "@/lib/prisma";
import { systemDateTime } from "@/lib/utils";
import {
  accountEnabledModuleSchema,
  syncAccountModulesSchema,
} from "../schemas";

export async function activateAccountEnabledModules({
  accountKey,
  enabledModules,
}: z.infer<typeof accountEnabledModuleSchema>) {
  const account = await findAccountByKey({ accountKey });

  return prisma.account.update({
    data: {
      enabledModules,
    },
    where: {
      id: account.id,
    },
  });
}

export async function adminSyncAccountModules({
  accountKey,
}: z.infer<typeof syncAccountModulesSchema>) {
  const account = await findAccountByKey({ accountKey });

  return {
    enabledModules: account.enabledModules,
    lastSyncModules: systemDateTime.toUTC(),
  };
}
