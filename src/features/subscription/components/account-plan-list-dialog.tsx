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
import { useState } from "react";
import { AccountPlanCard } from "./account-plan-card";

export function AccountPlanListDialog({
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
        <Button>Generate License</Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Change Account Plan</DialogTitle>
          <DialogDescription>Change Account Plan</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-5 flex-wrap">
          {subscriptions.map((subscription) => (
            <AccountPlanCard
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
