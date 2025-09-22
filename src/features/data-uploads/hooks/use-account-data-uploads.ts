import useSWR from "swr";
import { fetchAccountAllDataUploads } from "../actions/account-data-uploads";

export function useAccountDataUploads({
  accountKey,
  page,
}: {
  accountKey: string;
  page?: number;
}) {
  const { data: dataUploads, error } = useSWR(
    `/api/data-uploads/${accountKey}`,
    () => fetchAccountAllDataUploads({ accountKey, page }),
    {
      dedupingInterval: 60000,
    }
  );

  return {
    dataUploads,
    isLoading: !dataUploads && !error,
    error,
  };
}
