import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Subscription } from "@prisma/client";

export function DataSyncSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card>
      <CardTitle>{subscription.plan}</CardTitle>
      <CardContent>{subscription.planDays}</CardContent>
    </Card>
  );
}
