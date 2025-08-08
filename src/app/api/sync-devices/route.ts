import { ApiResponse } from "@/lib/api-response";
import { createSyncDeviceSchema } from "@/lib/schemas/sync-device";
import { createSyncDevice } from "@/lib/sync-device/create-sync-device";
import { fetchSyncDevices } from "@/lib/sync-device/fetch-sync-devices";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const devices = await fetchSyncDevices();
  return NextResponse.json(devices);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createSyncDeviceSchema.safeParse(body);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Field validation failed",
        data: parseResult.error.format(),
        statusCode: 400,
      });
    }
    const data = parseResult.data;

    const device = await createSyncDevice(data);

    return ApiResponse.success({ data: device });
  } catch (error: unknown) {
    return ApiResponse.error({ error: error });
  }
}
