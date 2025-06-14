"use client";
import { useAccounts } from "@/lib/swr/use-accounts";
import { AccountCard } from "./account-card";
import { DataTable } from "@/components/data-table";
import { columns } from "../columns";

export function AccountList() {
  const { accounts, error } = useAccounts();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  return <DataTable columns={columns} data={accounts ?? []} />;
}
