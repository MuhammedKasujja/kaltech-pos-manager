import { DataUpload } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useDataUploads() {
  const { data: updates, error } = useSWR<DataUpload[]>(
    `/api/data-uploads`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    updates,
    isLoading: !updates && !error,
    error,
  };
}
