import { fetchSyncDeviceSchema } from "@/features/data-uploads/schemas";
import { fetchAccountSyncDevices } from "@/features/sync-device/actions";
import { ApiResponse } from "@/lib/api-response";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const query = Object.fromEntries(searchParams.entries());
    const parseResult = fetchSyncDeviceSchema.safeParse(query);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Validation errors",
        data: parseResult.error.format(),
      });
    }

    const updates = await fetchAccountSyncDevices(parseResult.data);
    return ApiResponse.success({ data: updates });
  } catch (error) {
    return ApiResponse.error({ error: error });
  }
}
