import { getTranslations } from "@/i18n/server";
import { AccountList } from "./_components/account-list";

export default async function Page() {
  const tr = await getTranslations("account");
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>{tr("title")}</div>
      <AccountList />
    </div>
  );
}
