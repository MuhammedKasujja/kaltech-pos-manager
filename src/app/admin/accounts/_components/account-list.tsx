"use client";
import { useAccounts } from "@/lib/swr/use-accounts";

export function AccountList() {
  const { accounts, error } = useAccounts();
   
  if (error) {
    return <div>{`${error}`}</div>
  }
  return (
    <ul className="md:gap-6 md:p-6">
      {accounts?.map((account) => (
        <li key={account.id}>{account.account_key}</li>
      ))}
    </ul>
  );
}
