import { systemDateTime } from "@/lib/utils";
import { DateTime } from "luxon";

/**
 * check if the license is still valid using [appliedAt] field plus license days against current DateTime
 *
 * @param appliedAt Date
 * @param subDays number `subscription days`
 * @returns boolean
 */
export function isSubscriptionActive({
  appliedAt,
  subDays,
}: {
  appliedAt: Date | undefined | null;
  subDays: number;
}) {
  if (!appliedAt) return false;

  const appliedDate = DateTime.fromJSDate(appliedAt);
  const expiryDate = appliedDate.plus({ days: subDays });
  return systemDateTime.diff(expiryDate).milliseconds < 0;
}
