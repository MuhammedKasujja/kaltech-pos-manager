import { fetchAccountSetupSubscriptionPlans } from "@/features/subscription/actions/fetch-subscription-plans";
import { AccountSubscriptionCard } from "@/features/subscription/components/account-subscription-card";
import { AccountSubscriptionForm } from "@/features/subscription/components/forms/account-subscription-form";

export default async function SubscriptionsPage() {
  const subscriptions = await fetchAccountSetupSubscriptionPlans();
  return (
    <div className="flex flex-col gap-4 p-6">
      <AccountSubscriptionForm />
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
