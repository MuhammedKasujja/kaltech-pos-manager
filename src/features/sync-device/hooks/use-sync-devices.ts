import useSWR from "swr";
import { SyncDeviceDetail } from "@/features/sync-device/actions";
import { fetcher } from "@/lib/fetcher";

export function useSyncDevices() {
  const { data: devices, error } = useSWR<SyncDeviceDetail[]>(
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
