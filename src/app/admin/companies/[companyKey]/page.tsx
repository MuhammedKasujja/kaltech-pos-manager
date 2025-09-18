import {
  CompanyCard,
  AdminUserCard,
  SyncDeviceList,
} from "@/features/company/components";
import { fetchDataSyncSubscriptionPlans } from "@/features/subscription/actions/fetch-subscription-plans";

export default async function CompanyDetailsPage(
  props: PageProps<"/admin/companies/[companyKey]">
) {
  const { companyKey } = await props.params;
  const subscriptions = await fetchDataSyncSubscriptionPlans();

  return (
    <div className="container flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <CompanyCard companyKey={companyKey} subscriptions={subscriptions} />
        <AdminUserCard companyKey={companyKey} />
      </div>
      <SyncDeviceList companyKey={companyKey} />
    </div>
  );
}
