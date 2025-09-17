import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Subscription } from "@prisma/client";

export function DataSyncSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card className="p-5 min-h-80">
      <CardTitle>{subscription.plan}</CardTitle>
      <CardContent>{subscription.planDays}</CardContent>
    </Card>
  );
}
