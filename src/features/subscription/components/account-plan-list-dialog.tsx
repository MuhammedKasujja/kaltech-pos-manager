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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
