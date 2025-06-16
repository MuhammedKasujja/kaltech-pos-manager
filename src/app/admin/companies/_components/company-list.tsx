"use client";

import { useCompanies } from "@/lib/swr/use-companies";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns";
import { LoadingShimmer } from "@/components/loading-shimmer";

export function CompanyList() {
  const { companies, error, isLoading } = useCompanies();
  if (error) return <div>{`${error}`}</div>;
  if (isLoading) return <LoadingShimmer/>;

  return <DataTable columns={columns} data={companies ?? []} />;
}
