import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Subscription } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import { AccountSubscriptionForm } from "./forms/account-subscription-form";

export function AccountSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card className="p-5 min-h-80 flex">
      <CardTitle className="text-xl flex justify-between">
        {subscription.name}
        <AccountSubscriptionForm
          subscription={{
            ...subscription,
            features: subscription.features.map((feat) => ({ value: feat })),
          }}
          trigger={
            <Button className="w-6 h-6">
              <IconEdit />
            </Button>
          }
        />
      </CardTitle>
      <CardContent className="px-0 space-y-3">
        <div className="text-muted-foreground">{subscription.tagline}</div>
        <div className="text-2xl font-bold">
          {subscription.planDays}
          <span> Days</span>
        </div>
        <div className="text-muted-foreground">
          <span>Monthly: USh </span>
          {subscription.yearlyPrice}
        </div>
        <div className="text-muted-foreground">
          <span>Yearly: USh </span>
          {subscription.yearlyPrice}
        </div>
        <ul className="space-y-3 text-base text-muted-foreground">
          {subscription.features
            .filter((feat) => feat.length > 0)
            .map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary text-xl leading-6">✓</span>
                {feature}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
