import useSWR from "swr";
import { fetchAccountLicenses } from "../actions/fetch-account-licenses";

export function useAccountLicenses(accountKey?: string) {
  const { data: licenses, error } = useSWR(
    accountKey ? `api/company-${accountKey}/licenses` : null,
    () => fetchAccountLicenses({ accountKey: accountKey }),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    licenses,
    isLoading: !licenses && !error,
    error,
  };
}
