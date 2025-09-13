"use server";

import prisma from "@/lib/prisma";

export async function toggleSyncDeviceStatus({
  deviceId,
}: {
  deviceId: number;
}) {
  const device = await prisma.syncDevice.findFirstOrThrow({
    where: {
      id: deviceId,
    },
  });

  await prisma.syncDevice.update({
    where: {
      id: deviceId,
    },
    data: {
      isActive: !device.isActive,
    },
  });

  return device.isActive
    ? "Device deactivated successfully"
    : "Device activated successfully";
}
