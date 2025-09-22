'use server'
import { verifySession } from "@/lib/auth/verify-session";
import { AccountDataUploadType } from "../schemas";
import { findAccountByKey } from "@/features/accounts/actions";
import prisma from "@/lib/prisma";

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
}): Promise<AccountDataUploadType[]> {
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