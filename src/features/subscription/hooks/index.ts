import useSWR from "swr";
import {
  fetchAccountSetupSubscriptionPlans,
  fetchDataSyncSubscriptionPlans,
} from "../actions/fetch-subscription-plans";

export function useAccountSetupSubscriptions() {
  const { data: subscriptions, error } = useSWR(
    `api/subscriptions/setup`,
    () => fetchAccountSetupSubscriptionPlans(),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    subscriptions,
    isLoading: !subscriptions && !error,
    error,
  };
}

export function useDataSyncSubscriptions() {
  const {
    data: subscriptions,
    error,
    isLoading,
  } = useSWR(
    `api/subscriptions/data-sync`,
    () => fetchDataSyncSubscriptionPlans(),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    subscriptions,
    isLoading,
    error,
  };
}
