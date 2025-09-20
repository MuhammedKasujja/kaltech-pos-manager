"use client";
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
import { DataSyncActivationCard } from "./data-sync-activation-card";
import { useState } from "react";

export function SubscriptionListDialog({
  subscriptions,
  accountKey,
}: {
  subscriptions: Subscription[];
  accountKey: string | undefined;
}) {
  const [selectedId, setSelectedId] = useState<number>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IconCirclePlusFilled />
          Change Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] max-h-[90vh] flex flex-col pb-2">
        <DialogHeader>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogDescription>Change Data Syncronization Plan</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9 flex-1 overflow-y-auto px-6 py-8">
          {subscriptions.map((subscription) => (
            <DataSyncActivationCard
              key={subscription.name}
              subscription={subscription}
              accountKey={accountKey}
              isSelected={selectedId === subscription.id}
              onClickAction={() => setSelectedId(subscription.id)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
