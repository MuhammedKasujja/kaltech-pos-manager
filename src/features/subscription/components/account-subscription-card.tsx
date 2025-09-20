import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Subscription } from "@prisma/client";

export function AccountSubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <Card className="p-5 min-h-80 flex">
      <CardTitle className="text-xl">{subscription.name}</CardTitle>
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
