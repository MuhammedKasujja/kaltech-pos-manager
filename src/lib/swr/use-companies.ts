import { Prisma } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

const query = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: { admin: true },
});

export type CompanyDetail = Prisma.CompanyGetPayload<typeof query>;

export function useCompanies() {
  const { data: companies, error } = useSWR<CompanyDetail[]>(
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
