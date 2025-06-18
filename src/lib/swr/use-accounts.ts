import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export const accountWithCompany = Prisma.validator<Prisma.AccountDefaultArgs>()(
  {
    include: { company: true },
  },
);

export type AccountDetail = Prisma.AccountGetPayload<typeof accountWithCompany>;

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
