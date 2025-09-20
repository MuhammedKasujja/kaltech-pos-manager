"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { generateDataSyncLicense } from "@/features/license/actions/generate-sync-license";
import { cn } from "@/lib/utils";
import { Subscription } from "@prisma/client";
import { toast } from "sonner";

export function DataSyncActivationCard({
  subscription,
  isSelected,
  accountKey,
  onClickAction,
}: {
  isSelected: boolean;
  accountKey: string | undefined;
  subscription: Subscription;
  onClickAction: () => void;
}) {
  async function handleActivateSyncSubscription() {
    if (isSelected && accountKey !== undefined) {
      try {
        await generateDataSyncLicense({
          accountKey: accountKey!,
          subscriptionId: subscription.id,
        });
        toast.success("Sync Plan Activated Successfully");
      } catch (error) {
        toast.error(`${error?.toString()}`);
      }
    }
  }

  return (
    <Card
      className={cn(
        "p-5 min-h-80 transition-all",
        isSelected
          ? "border-primary bg-muted/30 shadow-xl scale-105 md:-mt-6"
          : "border border-muted"
      )}
      onClick={onClickAction}
    >
      <CardContent className="space-y-2.5 px-4">
        <CardTitle className="text-2xl flex justify-between">
          {subscription.name}
        </CardTitle>
        <div>{subscription.tagline}</div>
        <div>
          <span>Days: </span>
          {subscription.planDays}
        </div>
        <div>
          <span>Allowed Devices: </span>
          {subscription.maxSyncDevices}
        </div>
        <div>
          <span>Monthly Price: USh </span>
          {subscription.monthylyPrice}
        </div>
        <div>
          <span>Yearly Price: USh </span>
          {subscription.yearlyPrice}
        </div>
      </CardContent>
      <CardFooter className="flex w-full mt-4 px-1 pb-2">
        <Button
          className="flex w-full"
          onClick={handleActivateSyncSubscription}
        >
          Activate
        </Button>
      </CardFooter>
    </Card>
  );
}
