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
import { AccountActionButtons } from "./account-action-buttons";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export function CompanyCard({ companyKey }: { companyKey: string }) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;
  return (
    <Card className="w-full">
      <CardContent className="space-y-2.5">
        <CardTitle className="flex justify-between text-2xl">
          <>{company?.name}</>
          <Badge variant="outline" className="text-muted-foreground px-2 capitalize">
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
        <CardAction className="flex gap-4">
          <AccountActionButtons
            license={company?.account?.licence.at(
              company?.account.licence.length - 1
            )}
            accountKey={company?.account?.accountKey}
          />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
