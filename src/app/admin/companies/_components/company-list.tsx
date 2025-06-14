"use client";

import { useCompanies } from "@/lib/swr/use-companies";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns";

export function CompanyList() {
  const { companies, error } = useCompanies();
  if (error) return <div>{`${error}`}</div>;

  return <DataTable columns={columns} data={companies ?? []} />;
}
