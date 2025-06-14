import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const devices = await prisma.syncDevice.findMany();
  return NextResponse.json(devices);
}

export async function POST(req: NextRequest) {
  const devices = await prisma.syncDevice.findMany();
  return NextResponse.json(devices);
}
