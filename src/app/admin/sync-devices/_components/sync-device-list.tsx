"use client";
import { useSyncDevices } from "@/lib/swr/use-sync-devices";
import { columns } from "../columns";
import { DataTable } from "@/components/data-table";

export function SyncDeviceList() {
  const { devices, error } = useSyncDevices();

  if (error) return <div>{`${error}`}</div>;
  return <DataTable columns={columns} data={devices ?? []} />;
}
