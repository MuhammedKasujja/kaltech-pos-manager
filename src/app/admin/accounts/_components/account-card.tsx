"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { AccountDetail } from "@/lib/swr/use-accounts";

export function AccountCard({ account }: { account: AccountDetail }) {
  return (
    <Card>
      <CardContent className="space-y-2.5">
        <CardTitle>{account.company.name}</CardTitle>
        <div>{account.company.phone}</div>
        <div>{account.accountKey}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {account.createdAt.toString()}
        </div>
      </CardFooter>
    </Card>
  );
}
