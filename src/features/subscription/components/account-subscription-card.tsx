import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Subscription } from "@prisma/client";

export function AccountSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card className="p-5 min-h-80">
      <CardTitle>{subscription.name}</CardTitle>
      <CardContent>{subscription.planDays}</CardContent>
    </Card>
  );
}
