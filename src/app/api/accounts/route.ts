import { CreateAccountSchema } from "@/features/accounts/schemas";
import { createCompanyAccount } from "@/lib/account/create-account";
import { getAllAccounts } from "@/lib/account/get-all-account";
import { ApiResponse } from "@/lib/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const accounts = await getAllAccounts();
  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = CreateAccountSchema.safeParse(body);

    if (!parseResult.success) {
      // { error: parseResult.error.flatten().formErrors },
      return ApiResponse.error({
        error: "Field validation failed",
        data: parseResult.error.format(),
        statusCode: 400,
      });
    }
    const request = parseResult.data;
    const account = await createCompanyAccount(request);
    return ApiResponse.success({
      data: account,
      message: "Account created Successfully",
    });
  } catch (error) {
    return ApiResponse.error({ error: error });
  }
}
