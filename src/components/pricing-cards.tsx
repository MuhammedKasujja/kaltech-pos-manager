"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      title: "Plus",
      subtitle: "For personal use",
      price: yearly ? "$190/yr" : "$19/mo",
      features: [
        "Up to 5 team members",
        "Basic components library",
        "Community support",
        "1GB storage space",
      ],
    },
    {
      title: "Pro",
      subtitle: "For professionals",
      price: yearly ? "$490/yr" : "$49/mo",
      features: [
        "Everything in Plus, and:",
        "Unlimited team members",
        "Advanced components",
        "Priority support",
        "Unlimited storage",
      ],
    },
    {
      title: "Enterprise",
      subtitle: "For large teams",
      price: "Contact us",
      features: [
        "Custom solutions",
        "Dedicated support",
        "Single Sign-On (SSO)",
        "Custom deployment",
      ],
    },
  ];

  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-5xl font-bold mb-4">Pricing</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Check out our affordable pricing plans
      </p>

      <div className="flex items-center justify-center gap-2 mb-12">
        <span className="text-base font-medium">Monthly</span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span className="text-base font-medium">Yearly</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => {
          const isMiddle = index === 1;
          return (
            <Card
              key={plan.title}
              className={`text-left flex flex-col justify-between transition-all min-h-[520px] p-8 ${
                isMiddle
                  ? "border-primary bg-muted/30 shadow-xl scale-105 md:-mt-6"
                  : "border border-muted"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <p className="text-base text-muted-foreground">
                  {plan.subtitle}
                </p>
                <p className="text-4xl font-bold mt-4">{plan.price}</p>
              </CardHeader>
              <CardContent className="flex-1 mt-4">
                <ul className="space-y-3 text-base text-muted-foreground">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary text-xl leading-6">✓</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full text-base font-semibold">
                  {plan.price === "Contact us" ? "Contact Sales" : "Purchase"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
