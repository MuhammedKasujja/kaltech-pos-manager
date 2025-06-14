import { Company } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useCompanies() {
  const { data: companies, error } = useSWR<Company[]>(
    `/api/companies`,
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    companies,
    isLoading: !companies && !error,
    error,
  };
}
