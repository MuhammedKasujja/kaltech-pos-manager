import { ApiResponse } from "@/lib/api-response";
import { createDataUpload } from "@/lib/data-upload/create-data-upload";
import prisma from "@/lib/prisma";
import { createDataUpdateSchema } from "@/lib/schemas/data-upload";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.dataUpload.findMany();
  return NextResponse.json(updates);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createDataUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Validation errors",
        data: parseResult.error.format(),
      });
    }
    const data = parseResult.data;

    const update = await createDataUpload(data);

    return ApiResponse.success({ data: update });
  } catch (error) {
    return ApiResponse.error({ error: error });
  }
}
