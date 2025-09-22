import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CompanyCard,
  AdminUserCard,
  SyncDeviceList,
} from "@/features/company/components";
import { AccountDataUploadsTable } from "@/features/data-uploads/components/AccountDataUploadsTable";
import {
  fetchDataSyncSubscriptionPlans,
  fetchAccountSetupSubscriptionPlans,
} from "@/features/subscription/actions/fetch-subscription-plans";
import { IconDevicesPc, IconRefresh } from "@tabler/icons-react";

export default async function CompanyDetailsPage(
  props: PageProps<"/admin/accounts/[accountKey]">
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
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="devices">
          <TabsList>
            <TabsTrigger value="devices">
              <IconDevicesPc />
              <span className="uppercase">Devices</span>
            </TabsTrigger>
            <TabsTrigger value="data_uploads">
              <IconRefresh />
              <span className="uppercase">Data Uploads</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="devices">
            <SyncDeviceList companyKey={accountKey} />
          </TabsContent>
          <TabsContent value="data_uploads">
            <AccountDataUploadsTable accountKey={accountKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
