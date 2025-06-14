"use client";
import { useAccounts } from "@/lib/swr/use-accounts";
import { AccountCard } from "./account-card";

export function AccountList() {
  const { accounts, error } = useAccounts();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  return (
    <div className="flex flex-wrap">
      {accounts?.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
