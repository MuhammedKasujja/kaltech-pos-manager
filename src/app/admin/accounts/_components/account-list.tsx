"use client";
import { useAccounts } from "@/lib/swr/use-accounts";

export function AccountList() {
  const { accounts, error } = useAccounts();
   
  if (error) {
    return <div>{`${error}`}</div>
  }
  return (
    <ul>
      {accounts?.map((account) => (
        <li key={account.id}>{account.account_key}</li>
      ))}
    </ul>
  );
}
