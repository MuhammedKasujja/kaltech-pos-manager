"use server";

import prisma from "@/lib/prisma";

export async function fetchSyncDevices() {
  // await prisma.syncDevice.deleteMany()
  return await prisma.syncDevice.findMany();
}
