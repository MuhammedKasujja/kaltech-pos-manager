import "server-only";

import prisma from "@/lib/prisma";

export async function getAllUsersDTO() {
  const users = await prisma.user.findMany();

  return users.map(({ id, email, firstName, lastName }) => {
    return { id, email, firstName, lastName };
  });
}

export async function getUserDTO(userId?: string | number) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId?.toString() ?? "") },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { id, email, firstName, lastName } = user;

  return { id, email, name: `${firstName} ${lastName}`, avatar: "" };
}
