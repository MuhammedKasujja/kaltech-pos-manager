import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export const companyQuery = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: { admin: true, account: { include: { licence: true } } },
});

export type CompanyDetail = Prisma.CompanyGetPayload<typeof companyQuery>;

export function useCompanies() {
  const { data: companies, error } = useSWR<CompanyDetail[]>(
    `/api/companies`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    companies,
    isLoading: !companies && !error,
    error,
  };
}
