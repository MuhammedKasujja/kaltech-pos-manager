import { User } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useSystemUsers() {
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher, {
    dedupingInterval: 60000,
  });
  return {
    users,
    isLoading: !users && !error,
    error,
  };
}
