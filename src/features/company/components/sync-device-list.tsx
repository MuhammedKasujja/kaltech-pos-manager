"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react";
import React from "react";

export function SyncDeviceList({ companyKey }: { companyKey: string }) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;

  if (company?.account?.devices.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No sync devices found.
      </div>
    );
  }

  return (
    <React.Fragment>
      {company?.account?.devices.map((device) => (
        <Card key={device.deviceId} className="mb-4">
          <CardContent className="space-y-2.5">
            <CardTitle>{device.userName}</CardTitle>
            <div>ID: {device.deviceId}</div>
            <div>
              Status:{" "}
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {device.isActive ? (
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : (
                  <IconXboxXFilled className="fill-red-500 dark:fill-red-400"/>
                )}
                {device.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Last Synced:{" "}
              {device.lastSyncDate
                ? new Date(device.lastSyncDate).toLocaleString()
                : "Never"}
            </div>
          </CardFooter>
        </Card>
      ))}
    </React.Fragment>
  );
}
