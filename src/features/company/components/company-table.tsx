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

type CompanyTableProps = {
  queryKeys?: Partial<QueryKeys>;
};

export function CompanyTable({ queryKeys }: CompanyTableProps) {
  const { data, error, isLoading } = useCompanies();

  if (error) return <div>{`${error}`}</div>;
  if (isLoading || data == null)
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        shrinkZero
      />
    );

  return <AccountTable data={data} />;
}

function AccountTable({
  data,
  queryKeys,
}: { data: CompanyDetail[] } & CompanyTableProps) {
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
