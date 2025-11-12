import {
  applyLicenceKey,
  applyLicenceKeySchema,
} from "@/features/accounts/actions/account-apply-license";
import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = applyLicenceKeySchema.safeParse(body);

    if (!parseResult.success) {
      // { error: parseResult.error.flatten().formErrors },
      return ApiResponse.error({
        error: "Field validation failed",
        data: parseResult.error.format(),
        statusCode: 400,
      });
    }
    const request = parseResult.data;
    const account = await applyLicenceKey(request);
    return ApiResponse.success({
      data: account,
      message: "Account created Successfully",
    });
  } catch (error: unknown) {
    return ApiResponse.error({ error: error });
  }
}
