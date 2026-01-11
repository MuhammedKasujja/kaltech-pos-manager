"use client";
import { columns } from "./user-table-columns";
import { QueryKeys } from "@/types/data-table";
import { getUsers } from "../actions/get-users";
import React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { SystemUserForm } from "./system-user-form";

type UsersTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getUsers>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function UsersTable({ promises, queryKeys }: UsersTableProps) {
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
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <SystemUserForm />
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}
