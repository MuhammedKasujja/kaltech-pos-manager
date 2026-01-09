import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { getAllAccounts } from "../actions";

export type AccountDetail = Awaited<ReturnType<typeof getAllAccounts>>[0];

export function useAccounts() {
  const { data: accounts, error } = useSWR<AccountDetail[]>(
    `/api/accounts`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    accounts,
    isLoading: !accounts && !error,
    error,
  };
}
