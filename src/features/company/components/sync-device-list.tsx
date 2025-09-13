"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";
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
            {/* <div>Status: {device.isActive ? "Active" : "Inactive"}</div> */}
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Last Synced:{" "}
              {device.createdAt
                ? new Date(device.createdAt).toLocaleString()
                : "Never"}
            </div>
          </CardFooter>
        </Card>
      ))}
    </React.Fragment>
  );
}
