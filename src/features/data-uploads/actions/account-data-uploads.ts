"use server";
import { verifySession } from "@/lib/auth/verify-session";
import { findAccountByKey } from "@/features/accounts/actions";
import prisma from "@/lib/prisma";
import { GetAccountDataUploadsSchema } from "../types";

export type AccountDataUploadType = Awaited<
  ReturnType<typeof fetchAccountAllDataUploads>
>["data"][0];
/**
 * Get account data uploads
 * @param accountKey string
 * @returns
 */
export async function fetchAccountAllDataUploads(
  input: GetAccountDataUploadsSchema & { accountKey: string },
) {
  await verifySession();
  const account = await findAccountByKey({ accountKey: input.accountKey });

  const { page, perPage } = input;

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(perPage)));
  const skip = (safePage - 1) * safePageSize;

  const [items, total] = await Promise.all([
    prisma.dataUpload.findMany({
      skip,
      take: safePageSize,
      where: {
        accountId: account.id,
      },
      include: {
        account: { include: { company: {} } },
        uploads: { include: { device: {} } },
      },
      orderBy: { createdAt: "asc" },
    }),

    prisma.dataUpload.count(),
  ]);

  const totalPages = Math.ceil(total / safePageSize);

  return { data: items, totalPages };

  // const flattenedData = dataUploads.flatMap((item) => item.data);
}
