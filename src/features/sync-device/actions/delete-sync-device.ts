"use server";

import prisma from "@/lib/prisma";

export async function deleteSyncDevice({ deviceId }: { deviceId: number }) {
  const device = await prisma.syncDevice.delete({
    where: {
      id: deviceId,
    },
  });

  return device;
}
