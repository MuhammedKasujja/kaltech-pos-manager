import { systemDateTime } from "@/lib/utils";
import { DateTime } from "luxon";

export function isSubscriptionActive({
  appliedAt,
  subDays,
}: {
  appliedAt: Date;
  subDays: number;
}) {
  const appliedDate = DateTime.fromJSDate(appliedAt);
  const expiryDate = appliedDate.plus({ days: subDays });
  return systemDateTime.diff(expiryDate).milliseconds < 0;
}
