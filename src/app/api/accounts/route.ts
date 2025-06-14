import { createCompanyAccount } from "@/lib/account/create-account";
import prisma from "@/lib/prisma";
import { CreateAccountSchema } from "@/lib/schemas/account";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const accounts = await prisma.account.findMany();
  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parseResult = CreateAccountSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const request = parseResult.data;
  const updates = await createCompanyAccount(request);
  return NextResponse.json(updates);
}
