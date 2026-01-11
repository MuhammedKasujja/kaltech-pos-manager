import "server-only";

import prisma from "@/lib/prisma";
import { GetUsersSchema } from "../types";
import { Prisma } from "@prisma/client";

export type SystemUser = Awaited<ReturnType<typeof getUsers>>["data"][0];

export async function getUsers(input: GetUsersSchema) {
  const { page, perPage, search } = input;

  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(perPage)));
  const skip = (safePage - 1) * safePageSize;

  const where: Prisma.UserWhereInput = {
    AND: [],
  };

  // Full/ Free text search (simple version - case insensitive)
  if (search?.trim()) {
    const searchTerm = search.trim();
    where.OR = [
      { firstName: { contains: searchTerm, mode: "insensitive" } },
      { email: { contains: searchTerm, mode: "insensitive" } },
      { lastName: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: safePageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / safePageSize);

  return { data: items, totalPages };
}

export async function getUserById(userId?: string | number) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId?.toString() ?? "") },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { id, email, firstName, lastName } = user;

  return {
    id,
    email,
    name: `${firstName} ${lastName}`,
    avatar: "",
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
  };
}
