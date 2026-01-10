"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import { QueryKeys } from "@/types/data-table";
import { getCompanies } from "../actions/get-all-companies";
import React from "react";

type CompanyTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getCompanies>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function CompanyTable({ promises, queryKeys }: CompanyTableProps) {
  const [{ data, totalPages }] = React.use(promises);

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
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

  return <DataTable table={table} />;
}
