"use client";

import {
  CompanyDetail,
  useCompanies,
} from "@/features/company/hooks/use-companies";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTable } from "@/hooks/use-data-table";
import { QueryKeys } from "@/types/data-table";
import { getCompanies } from "../actions/get-all-companies";
import React from "react";

type CompanyTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getCompanies>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function CompanyTable({ promises, queryKeys }: CompanyTableProps) {
  const { error, isLoading } = useCompanies();
  const [{ data }] = React.use(promises);

  if (error) return <div>{`${error}`}</div>;
  if (isLoading || data == null)
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        shrinkZero
      />
    );

  return <AccountTable data={data} queryKeys={queryKeys} />;
}

function AccountTable({
  data,
  queryKeys,
}: { data: CompanyDetail[] } & Pick<CompanyTableProps, "queryKeys">) {
  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data,
    columns,
    pageCount: 2,
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
