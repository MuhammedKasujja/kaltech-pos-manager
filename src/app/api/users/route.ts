import prisma from "@/lib/prisma";
import { createUserSchema } from "@/lib/schemas/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parseResult = createUserSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parseResult.data;

  const user = await prisma.user.create({ data });

  return NextResponse.json(user);
}
