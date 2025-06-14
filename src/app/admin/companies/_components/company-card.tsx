"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Company } from "@prisma/client";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Card>
      <CardContent className="space-y-2.5">
        <CardTitle>{company.name}</CardTitle>
        <div>{company.phone}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {company.createdAt.toString()}
        </div>
      </CardFooter>
    </Card>
  );
}
