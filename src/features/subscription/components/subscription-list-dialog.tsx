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
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Change Subscription Plan</DialogTitle>
          <DialogDescription>Change Data Syncronization Plan</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-5 flex-wrap">
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
