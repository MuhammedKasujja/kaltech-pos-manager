import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Subscription } from "@prisma/client";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { DataSyncSubscriptionCard } from "./data-sync-subscription-card";

export function SubscriptionListDialog({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IconCirclePlusFilled />
          Change Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogDescription>Change Data Syncronization Plan</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-5 flex-wrap">
          {subscriptions.map((subscription) => (
            <DataSyncSubscriptionCard subscription={subscription} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
