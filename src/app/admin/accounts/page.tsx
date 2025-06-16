import { AccountList } from "./_components/account-list";

export default async function Page() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Accounts</div>
      <AccountList />
    </div>
  );
}
