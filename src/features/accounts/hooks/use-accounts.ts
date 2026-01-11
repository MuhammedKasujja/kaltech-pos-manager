import useSWR from "swr";
import {
  AccountDetailPreview,
  getAccountDetails,
} from "../actions/get-account-details";


export function useAccountDetails(accountKey: string) {
  const { data: company, error } = useSWR<AccountDetailPreview>(
    accountKey ? `api/company-${accountKey}` : null,
    () => getAccountDetails(accountKey),
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
