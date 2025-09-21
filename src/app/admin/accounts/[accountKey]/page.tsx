import {
  CompanyCard,
  AdminUserCard,
  SyncDeviceList,
} from "@/features/company/components";
import {
  fetchDataSyncSubscriptionPlans,
  fetchAccountSetupSubscriptionPlans,
} from "@/features/subscription/actions/fetch-subscription-plans";

export default async function CompanyDetailsPage(
  props: PageProps<"/admin/accounts/[accountKey]">,
) {
  const { accountKey } = await props.params;
  const dataSubscriptions = await fetchDataSyncSubscriptionPlans();
  const accountSubscriptions = await fetchAccountSetupSubscriptionPlans();

  return (
    <div className="container flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <CompanyCard
          companyKey={accountKey}
          subscriptions={{
            account: accountSubscriptions,
            sync: dataSubscriptions,
          }}
        />
        <AdminUserCard companyKey={accountKey} />
      </div>
      <SyncDeviceList companyKey={accountKey} />
    </div>
  );
}
