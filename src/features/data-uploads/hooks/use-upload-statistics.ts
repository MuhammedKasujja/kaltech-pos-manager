import useSWR from "swr";
import { getDataUploadStatistics } from "../actions/upload-statistics";

export function useDataUploadStatistics() {
  const {
    data: statistics,
    error,
    isLoading,
  } = useSWR(
    `/api/sync-data-uploads/statistics`,
    () => getDataUploadStatistics(),
    {
      dedupingInterval: 60000,
    }
  );

  return {
    statistics,
    isLoading: isLoading,
    error,
  };
}
