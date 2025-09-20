import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchAccountSetupSubscriptionPlans,
  fetchDataSyncSubscriptionPlans,
} from "@/features/subscription/actions/fetch-subscription-plans";
import {
  DataSyncSubscriptionCard,
  DataSyncSubscriptionForm,
} from "@/features/subscription/components";
import { AccountSubscriptionCard } from "@/features/subscription/components/account-subscription-card";
import { AccountSubscriptionForm } from "@/features/subscription/components/forms/account-subscription-form";
import { getTranslations } from "@/i18n/server";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export default async function SubscriptionsPage() {
  const tr = await getTranslations("subscriptions");
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">{tr("accountPlans")}</TabsTrigger>
          <TabsTrigger value="data-subscriptions">
            {tr("syncronizationPlans")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSubscriptionsView />
        </TabsContent>
        <TabsContent value="data-subscriptions">
          <DataSyncSubscriptionsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
async function AccountSubscriptionsView() {
  const subscriptions = await fetchAccountSetupSubscriptionPlans();
  const tr = await getTranslations("subscriptions");
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div>{tr("accountPlans")}</div>
        <AccountSubscriptionForm
          trigger={
            <Button>
              <IconCirclePlusFilled />
              {tr("newAccountPlan")}
            </Button>
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <AccountSubscriptionCard
            key={subscription.name}
            subscription={subscription}
          />
        ))}
      </div>
    </div>
  );
}
async function DataSyncSubscriptionsView() {
  const subscriptions = await fetchDataSyncSubscriptionPlans();
  const tr = await getTranslations("subscriptions");
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div>{tr("syncronizationPlans")}</div>
        <DataSyncSubscriptionForm
          trigger={
            <Button>
              <IconCirclePlusFilled />
              <span>Data Sync Plan</span>
            </Button>
          }
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <DataSyncSubscriptionCard
            key={subscription.name}
            subscription={subscription}
          />
        ))}
      </div>
    </div>
  );
}
