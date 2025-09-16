"use server";

import prisma from "@/lib/prisma";

export async function fetchAccountLicenses({
  accountKey,
}: {
  accountKey: string;
}) {
  return await prisma.licence.findMany({
    where: {
      account: { accountKey },
    },
  });
}
