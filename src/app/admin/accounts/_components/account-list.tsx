"use client";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";
import { DataTableLegacy } from "@/components/data-table/data-table-old";
import { columns } from "../columns";
import { LoadingShimmer } from "@/components/loading-shimmer";

export function AccountList() {
  const { accounts, error, isLoading } = useAccounts();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  if (isLoading) return <LoadingShimmer />;
  return <DataTableLegacy columns={columns} data={accounts ?? []} />;
}
