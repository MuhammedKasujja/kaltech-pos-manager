import {
  CompanyCard,
  AdminUserCard,
  SyncDeviceList,
} from "@/features/company/components";

export default async function CompanyDetailsPage(
  props: PageProps<"/admin/companies/[companyKey]">
) {
  const { companyKey } = await props.params;

  return (
    <div className="container flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <CompanyCard companyKey={companyKey} />
        <AdminUserCard companyKey={companyKey} />
      </div>
      <SyncDeviceList companyKey={companyKey} />
    </div>
  );
}
