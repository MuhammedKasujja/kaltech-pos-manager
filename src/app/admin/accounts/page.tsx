import { getTranslations } from "@/i18n/server";
import { CompanyTable } from "@/features/company/components/company-table";

export default async function Page() {
  const tr = await getTranslations("account");
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>{tr("title")}</div>
      <CompanyTable />
    </div>
  );
}
