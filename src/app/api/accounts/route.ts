import { createCompanyAccount } from "@/lib/account/create-account";
import { ApiResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { CreateAccountSchema } from "@/lib/schemas/account";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const accounts = await prisma.account.findMany({
    include: { company: true },
  });
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
  } catch (error: any) {
    return ApiResponse.error({ error: error.toString() });
  }
}
