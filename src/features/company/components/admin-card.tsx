"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";

export function AdminUserCard({ companyKey }: { companyKey: string }) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;
  return (
    <Card className="w-full">
      <CardContent className="space-y-2.5">
        <CardTitle>{company?.admin.email}</CardTitle>
        <div>{company?.admin.phone}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {company?.admin.firstName} {company?.admin.lastName}
        </div>
      </CardFooter>
    </Card>
  );
}
