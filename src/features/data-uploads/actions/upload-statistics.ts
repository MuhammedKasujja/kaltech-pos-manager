"use server";

import { verifySession } from "@/lib/auth/verify-session";
import prisma from "@/lib/prisma";
import { systemDateTime } from "@/lib/utils";

export async function getDataUploadStatistics() {
  await verifySession();
  
  const totalUploads = await prisma.dataUpload.count();

  const totalAccountsWithUploads = await prisma.dataUpload.findMany({
    distinct: ["accountId"],
    select: { id: true },
  });

  const totalAccounts = await prisma.account.count();

  const weekStart = systemDateTime.startOf("week").toJSDate();
  const weekEnd = systemDateTime.endOf("week").toJSDate();

  // Count uploads for this week
  const countThisWeek = await prisma.dataUpload.count({
    where: {
      createdAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });

  return {
    totalAccounts,
    totalUploads,
    accountsWithUploads: totalAccountsWithUploads.length,
    weeklyUploads: countThisWeek,
  };
}
