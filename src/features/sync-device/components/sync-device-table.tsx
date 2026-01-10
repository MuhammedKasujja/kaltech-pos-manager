"use client";
import { columns } from "./sync-device-columns";
import { QueryKeys } from "@/types/data-table";
import { getSyncDevices } from "../actions/fetch-sync-devices";
import React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table";

type SyncDeviceListProps = {
  promises: Promise<[Awaited<ReturnType<typeof getSyncDevices>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function SyncDeviceTable({ promises, queryKeys }: SyncDeviceListProps) {

  const [{ data, totalPages }] = React.use(promises);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: totalPages,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    queryKeys,
    getRowId: (originalRow) => originalRow.deviceId,
    shallow: false,
    clearOnDefault: true,
  });

  return <DataTable table={table}></DataTable>;
}
