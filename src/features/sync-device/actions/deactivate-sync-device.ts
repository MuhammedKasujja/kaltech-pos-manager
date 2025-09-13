"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deactivateSyncDevice({ deviceId }: { deviceId: number }) {
  const device = await prisma.syncDevice.update({
    where: {
      id: deviceId,
    },
    data: { isActive: false },
  });
  revalidatePath("admin/sync-devices");

  return device;
}
