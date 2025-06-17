'use server'
import { cache } from "react";
import { verifySession } from "./verify-session";
import { getUserDTO } from "@/lib/dto/user-dto";

export const getAuthUser = cache(async () => {
  const session = await verifySession();
  if (!session) return  null;

  try {
    const user = await getUserDTO(session.userId.toString());
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
