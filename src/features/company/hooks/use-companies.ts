import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { getAllCompanies } from "../actions/get-all-companies";

export type CompanyDetail = Awaited<ReturnType<typeof getAllCompanies>>[0];

export function useCompanies() {
  const { data, error } = useSWR<CompanyDetail[]>(
    `/api/companies`,
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
