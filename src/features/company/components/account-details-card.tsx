"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";
import { formatDate } from "@/lib/format";
import { Subscription } from "@prisma/client";
import {
  AccountPlanListDialog,
  SubscriptionListDialog,
} from "@/features/subscription/components";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AccountEnableModuleDialog } from "@/features/accounts/components/enabled-modules-dialog";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";

export function AccountDetailsCard({
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
      <CardHeader>
        <CardTitle className="flex justify-start items-center text-2xl gap-2">
          {company?.name}
          <Status variant="success">
            <StatusIndicator />
            <StatusLabel className="capitalize">
              {company?.account?.plan}
            </StatusLabel>
          </Status>
        </CardTitle>
        <CardAction>
          <AccountEnableModuleDialog
            data={{
              enabledModules: company!.account?.enabledModules ?? 0,
              accountKey: company!.account!.accountKey,
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2.5">{company?.phone}</CardContent>
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
