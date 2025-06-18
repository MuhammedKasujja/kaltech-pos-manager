import prisma from "@/lib/prisma";
import { createUserSchema } from "@/lib/schemas/user";
import { hashPassword } from "@/lib/utils";
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
      { status: 400 },
    );
  }
  const data = parseResult.data;

  const encryptedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: encryptedPassword,
    },
  });

  return NextResponse.json(user);
}
