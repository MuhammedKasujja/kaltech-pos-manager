"use client";
import { useAccounts } from "@/lib/swr/use-accounts";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns";
import { LoadingShimmer } from "@/components/loading-shimmer";

export function AccountList() {
  const { accounts, error, isLoading } = useAccounts();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  if (isLoading) return <LoadingShimmer />;
  return <DataTable columns={columns} data={accounts ?? []} />;
}
