"use server";
import { cache } from "react";
import { verifySession } from "./verify-session";
import { getUserById } from "@/features/users/actions/get-users";

export const getAuthUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await getUserById(session.userId.toString());
    return user;
  } catch (error) {
    console.log(`Failed to fetch user ${error?.toString()}`);
    return null;
  }
});
