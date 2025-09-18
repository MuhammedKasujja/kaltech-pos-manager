import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Subscription } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";

export function DataSyncSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card className="p-5 min-h-80">
      <CardContent className="space-y-2.5 px-4">
        <CardTitle className="text-2xl flex justify-between">{subscription.name}
          <Button className="w-6 h-6" ><IconEdit/></Button>
        </CardTitle>
        <div>{subscription.about}</div>
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
      <CardFooter className="flex justify-end">
        <CardAction className="flex justify-end">
          <Button variant={"destructive"}>Deactivate</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
