import { ApiResponse } from "@/lib/api-response";
import { createDataUpload } from "@/lib/data-upload/create-data-upload";
import { fetchAccountDataUploads } from "@/lib/data-upload/fetch-data-uploads";
import {
  createDataUpdateSchema,
  fetchDataUploadsSchema,
} from "@/lib/schemas/data-upload";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const query = Object.fromEntries(searchParams.entries());
    const parseResult = fetchDataUploadsSchema.safeParse(query);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Validation errors",
        data: parseResult.error.format(),
      });
    }
    const data = parseResult.data;

    const updates = await fetchAccountDataUploads(data);
    return ApiResponse.success({ data: updates });
  } catch (error) {
    return ApiResponse.error({ error: error });
  }
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
