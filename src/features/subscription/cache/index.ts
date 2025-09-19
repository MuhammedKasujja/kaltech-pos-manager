import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getAccountSubscriptionGlobalTag() {
  return getGlobalTag("account-subscriptions");
}

export function getAccountSubscriptionIdTag(id: string) {
  return getIdTag("account-subscriptions", id);
}

export function getDataSubscriptionGlobalTag() {
  return getGlobalTag("data-subscriptions");
}

export function getDataSubscriptionIdTag(id: string) {
  return getIdTag("data-subscriptions", id);
}

export function revalidateSubscriptionCache(id: string) {
  revalidateTag(getAccountSubscriptionGlobalTag());
  revalidateTag(getAccountSubscriptionIdTag(id));
}

export function revalidateDataSubscriptionCache(id: string) {
  revalidateTag(getDataSubscriptionGlobalTag());
  revalidateTag(getDataSubscriptionIdTag(id));
}
