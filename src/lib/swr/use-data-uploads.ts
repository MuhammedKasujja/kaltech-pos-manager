import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { DataUploadDetail } from "@/features/data-uploads/actions";

export function useDataUploads() {
  const { data: updates, error } = useSWR<DataUploadDetail[]>(
    `/api/data-uploads`,
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    updates,
    isLoading: !updates && !error,
    error,
  };
}
