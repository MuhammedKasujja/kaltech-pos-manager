import { adminSyncAccountModules } from "@/features/accounts/actions/account-enabled-modules";
import { syncAccountModulesSchema } from "@/features/accounts/schemas";
import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = syncAccountModulesSchema.safeParse(body);

    if (!parseResult.success) {
      return ApiResponse.error({
        error: "Validation errors",
        data: parseResult.error.format(),
      });
    }

    const data = parseResult.data;

    const update = await adminSyncAccountModules(data);

    return ApiResponse.success({
      data: update,
      message: "Account modules sync successfully",
    });
  } catch (error) {
    return ApiResponse.error({ error: error });
  }
}
