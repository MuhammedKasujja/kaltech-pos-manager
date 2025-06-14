import { createDataUpload } from "@/lib/data-upload/create-data-upload";
import prisma from "@/lib/prisma";
import { createDataUpdateSchema } from "@/lib/schemas/data-upload";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.dataUpload.findMany();
  return NextResponse.json(updates);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parseResult = createDataUpdateSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 }
    );
  }
  const data = parseResult.data;

  const update = await createDataUpload(data);
  
  return NextResponse.json(update);
}
