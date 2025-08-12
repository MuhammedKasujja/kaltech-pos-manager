'use server'

import prisma from "@/lib/prisma";

export async function deleteDataUpload({
  accountKey,
  updateId,
}: {
  accountKey: string;
  updateId: number;
}) {
  const upload = await prisma.dataUpload.delete({
    where: {
      id: updateId,
      accountKey: accountKey,
    },
  });

  return upload;
}
