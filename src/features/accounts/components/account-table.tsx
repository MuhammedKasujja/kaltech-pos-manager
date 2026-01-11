"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./account-table-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { QueryKeys } from "@/types/data-table";
import React from "react";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { getAccounts } from "../actions";

type AccountsTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getAccounts>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function AccountsTable({ promises, queryKeys }: AccountsTableProps) {
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
    getRowId: (originalRow) => originalRow.companyAdminId.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}
