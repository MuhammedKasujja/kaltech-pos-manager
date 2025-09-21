import { ApiResponse } from "@/lib/api-response";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET) {
    return ApiResponse.error({ error: "Forbidden", statusCode: 403 });
  }

  try {
    const password = await bcrypt.hash("password", 10);
    await prisma.user.create({
      data: {
        password: password,
        firstName: "Kasujja",
        lastName: "Muhammed",
        email: "kasujja@gmail.com",
      },
    });
    await prisma.user.create({
      data: {
        password: password,
        firstName: "Jjuuko",
        lastName: "Micheal",
        email: "jjuuko@gmail.com",
      },
    });
    await prisma.$disconnect();
    ApiResponse.success({ message: "Seeding successful" });
  } catch (error: unknown) {
    console.error(error);
    await prisma.$disconnect();
    return ApiResponse.error({ error: error?.toString(), statusCode: 500 });
  }
}
