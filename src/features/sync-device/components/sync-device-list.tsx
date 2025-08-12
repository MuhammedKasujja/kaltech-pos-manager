"use client";
import { useSyncDevices } from "@/lib/swr/use-sync-devices";
import { DataTable } from "@/components/data-table";
import { LoadingShimmer } from "@/components/loading-shimmer";
import { columns } from "./columns";

export function SyncDeviceList() {
  const { devices, error, isLoading } = useSyncDevices();

  if (error) return <div>{`${error}`}</div>;
  if (isLoading) return <LoadingShimmer />;

  return <DataTable columns={columns} data={devices ?? []} />;
}
