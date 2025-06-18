import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.SEED_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
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

    res.status(200).json({ message: "Seeding successful" });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error?.toString() });
  } finally {
    await prisma.$disconnect();
  }
}
