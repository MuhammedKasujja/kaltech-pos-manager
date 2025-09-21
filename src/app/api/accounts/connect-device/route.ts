import { registerSynceDeviceWithAccountSchema } from "@/features/sync-device/schemas";
import { ApiResponse } from "@/lib/api-response";
import { connectAccountDevice } from "@/features/sync-device/actions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = registerSynceDeviceWithAccountSchema.safeParse(body);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Field validation failed",
        data: parseResult.error.format(),
        statusCode: 400,
      });
    }
    const request = parseResult.data;

    const data = await connectAccountDevice(request);
    return ApiResponse.success({
      data: data,
      message: "Device Connected Successfully.....",
    });
  } catch (error: unknown) {
    return ApiResponse.error({ error: error });
  }
}
