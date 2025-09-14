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
import { ChangeAdminAccountPassword } from "./change-admin-password-form";

export function AdminUserCard({ companyKey }: { companyKey: string }) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;
  return (
    <Card className="w-full">
      <CardContent className="space-y-2.5">
        <CardTitle>{company?.admin.email}</CardTitle>
        <div>{company?.admin.phone}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2.5 text-sm">
        <div className="text-muted-foreground">
          {company?.admin.firstName} {company?.admin.lastName}
        </div>
        <CardAction className="flex gap-4 justify-end w-full">
          <ChangeAdminAccountPassword
            accountKey={company?.account?.accountKey}
          />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
