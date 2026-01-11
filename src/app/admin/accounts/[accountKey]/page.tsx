import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AccountDetailsCard,
  AdminUserCard,
  SyncDeviceList,
} from "@/features/company/components";
import { fetchAccountAllDataUploads } from "@/features/data-uploads/actions/account-data-uploads";
import { AccountDataUploadsTable } from "@/features/data-uploads/components/account-data-uploads-table";
import { dataUploadSearchParamsCache } from "@/features/data-uploads/types";
import {
  fetchDataSyncSubscriptionPlans,
  fetchAccountSetupSubscriptionPlans,
} from "@/features/subscription/actions/fetch-subscription-plans";
import { getValidFilters } from "@/lib/data-table";
import { IconDevicesPc, IconRefresh } from "@tabler/icons-react";

export default async function CompanyDetailsPage(
  props: PageProps<"/admin/accounts/[accountKey]">,
) {
  const { accountKey } = await props.params;
  const searchParams = await props.searchParams;
  const search = dataUploadSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const dataSubscriptions = await fetchDataSyncSubscriptionPlans();
  const accountSubscriptions = await fetchAccountSetupSubscriptionPlans();

  const promises = Promise.all([
    fetchAccountAllDataUploads({
      ...search,
      filters: validFilters,
      accountKey,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <AccountDetailsCard
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
            <AccountDataUploadsTable promises={promises} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
