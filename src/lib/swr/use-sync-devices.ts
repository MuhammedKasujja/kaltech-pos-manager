import useSWR from "swr";
import { fetcher } from "../fetcher";
import { SyncDevice } from "@prisma/client";

export function useSyncDevices() {
  const { data: devices, error } = useSWR<SyncDevice[]>(
    "/api/sync-devices",
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );
  return {
    devices,
    isLoading: !devices && !error,
    error,
  };
}
