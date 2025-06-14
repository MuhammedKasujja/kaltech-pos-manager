import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
