"use client";
import { useSyncDevices } from "@/lib/swr/use-sync-devices";
import { columns } from "../columns";
import { DataTable } from "@/components/data-table";
import { LoadingShimmer } from "@/components/loading-shimmer";

export function SyncDeviceList() {
  const { devices, error, isLoading } = useSyncDevices();

  if (error) return <div>{`${error}`}</div>;
  if (isLoading) return <LoadingShimmer />;

  return <DataTable columns={columns} data={devices ?? []} />;
}
