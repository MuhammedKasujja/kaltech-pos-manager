import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.dataUpload.findMany();
  return NextResponse.json(updates);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const updates = await prisma.dataUpload.create({ data });
  return NextResponse.json(updates);
}
