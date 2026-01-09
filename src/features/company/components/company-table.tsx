"use client";

import { useCompanies } from "@/features/company/hooks/use-companies";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export function CompanyTable() {
  const { companies, error, isLoading } = useCompanies();
  if (error) return <div>{`${error}`}</div>;
  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        cellWidths={[
          "10rem",
          "10rem",
          "15rem",
          "6rem",
          "10rem",
          "10rem",
          "6rem",
        ]}
        shrinkZero
      />
    );

  return (
    <DataTable columns={columns} data={companies ?? []} onSearch={() => {}} />
  );
}
