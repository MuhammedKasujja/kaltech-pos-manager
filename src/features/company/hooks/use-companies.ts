import { fetcher } from "@/lib/fetcher";
import { Prisma } from "@prisma/client";
import useSWR from "swr";

export const companyQuery = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: {
    admin: true,
    account: {
      select: { accountKey: true, id: true },
      include: { licence: true },
    },
  },
});

export type CompanyDetail = Prisma.CompanyGetPayload<typeof companyQuery>;

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
