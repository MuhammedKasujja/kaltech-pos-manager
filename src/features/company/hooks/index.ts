import {
  CompanyDetailPreview,
  getCompanyDetails,
} from "../actions/get-company-details";
import useSWR from "swr";

export function useCompanyDetails(accountKey: string) {
  const { data: company, error } = useSWR<CompanyDetailPreview>(
    accountKey ? `company-${accountKey}` : null,
    () => getCompanyDetails(accountKey),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    company,
    isLoading: !company && !error,
    error,
  };
}
