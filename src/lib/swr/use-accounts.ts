import { Account } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useAccounts() {
  const { data: accounts, error } = useSWR<Account[]>(
    `/api/accounts`,
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    accounts,
    loading: !accounts && !error,
    error,
  };
}
