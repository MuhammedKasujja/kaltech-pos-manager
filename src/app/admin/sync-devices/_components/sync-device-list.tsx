'use client'
import { useSyncDevices } from "@/lib/swr/use-sync-devices";

export function SyncDeviceList() {
  const { devices, error } = useSyncDevices();

  if (error) return <div>{`${error}`}</div>;
  return <div>{devices?.map((device) => <div>{device.device_id}</div>)}</div>;
}
