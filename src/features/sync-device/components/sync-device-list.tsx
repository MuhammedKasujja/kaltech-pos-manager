"use client";
import { useSyncDevices } from "@/features/sync-device/hooks/use-sync-devices";
import { DataTableLegacy } from "@/components/data-table/data-table-old";
import { columns } from "./columns";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export function SyncDeviceList() {
  const { devices, error, isLoading } = useSyncDevices();

  if (error) return <div>{`${error}`}</div>;
  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        cellWidths={["10rem", "10rem", "15rem", "10rem", "6rem"]}
        shrinkZero
      />
    );

  return (
    <DataTableLegacy columns={columns} data={devices ?? []} onSearch={() => {}} />
  );
}
