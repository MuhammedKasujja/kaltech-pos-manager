"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSyncDevice({ deviceId }: { deviceId: number }) {
  const device = await prisma.syncDevice.delete({
    where: {
      id: deviceId,
    },
  });
  revalidatePath("admin/sync-devices");

  return device;
}
