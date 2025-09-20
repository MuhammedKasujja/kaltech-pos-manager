"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Subscription } from "@prisma/client";
import {
  AccountPlanListDialog,
  SubscriptionListDialog,
} from "@/features/subscription/components";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAccountLicenses } from "@/features/license/hooks";

export function CompanyCard({
  companyKey,
  subscriptions,
}: {
  companyKey: string;
  subscriptions: { account: Subscription[]; sync: Subscription[] };
}) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;
  return (
    <Card className="w-full">
      <CardContent className="space-y-2.5">
        <CardTitle className="flex justify-between text-2xl">
          <>{company?.name}</>
          <Badge
            variant="outline"
            className="text-muted-foreground px-2 capitalize"
          >
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
            {company?.account?.plan}
          </Badge>
        </CardTitle>
        <div>{company?.phone}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2.5 text-sm">
        <div className="text-muted-foreground">
          {company?.createdAt && formatDate(company?.createdAt)}
        </div>
        <CardAction className="flex gap-4 flex-wrap">
          <AccountPlanListDialog
            subscriptions={subscriptions.account}
            accountKey={company?.account?.accountKey}
          />
          <Button
            variant={"outline"}
            onClick={() => {
              const license = company?.account?.licence.at(0);
              if (!license) {
                toast.error("No license key found");
                return;
              }
              navigator.clipboard.writeText(license?.licenceKey ?? "");
              toast.info("License key copied");
            }}
          >
            Copy License
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              const account = company?.account;
              if (account?.accountKey == undefined) return;

              navigator.clipboard.writeText(account?.accountKey);
              toast.info("Account Key Copied");
            }}
          >
            Copy Account Key
          </Button>
          <SubscriptionListDialog
            subscriptions={subscriptions.sync}
            accountKey={company?.account?.accountKey}
          />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
