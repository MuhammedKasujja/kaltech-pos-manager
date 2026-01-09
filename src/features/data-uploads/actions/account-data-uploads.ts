"use server";
import { verifySession } from "@/lib/auth/verify-session";
import { findAccountByKey } from "@/features/accounts/actions";
import prisma from "@/lib/prisma";

export type AccountDataUploadType = Awaited<
  ReturnType<typeof fetchAccountAllDataUploads>
>[0];
/**
 * Get account data uploads
 * @param accountKey string
 * @returns
 */
export async function fetchAccountAllDataUploads({
  accountKey,
}: {
  accountKey: string;
  page?: number;
}) {
  await verifySession();
  const account = await findAccountByKey({ accountKey: accountKey });

  const dataUploads = await prisma.dataUpload.findMany({
    where: {
      accountId: account.id,
    },
    include: {
      account: { include: { company: {} } },
      uploads: { include: { device: {} } },
    },
    orderBy: { createdAt: "asc" },
  });

  // const flattenedData = dataUploads.flatMap((item) => item.data);

  return dataUploads;
}
