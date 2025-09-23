"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyDetails } from "@/features/company/hooks";
import { deleteSyncDevice } from "@/features/sync-device/actions";
import { toggleSyncDeviceStatus } from "@/features/sync-device/actions/toggle-sync-device-status";
import { IconCircleCheckFilled, IconDevicesPcOff, IconXboxXFilled } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export function SyncDeviceList({ companyKey }: { companyKey: string }) {
  const { company, isLoading } = useCompanyDetails(companyKey);

  if (isLoading) return <LoadingShimmer />;

  if (company?.account?.devices.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground border rounded-lg h-72 text-center flex gap-2 items-center justify-center">
        <IconDevicesPcOff/>
        <span>No sync devices found.</span>
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
                  <IconXboxXFilled className="fill-red-500 dark:fill-red-400" />
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
            <CardAction className="flex gap-2">
              <Button
                variant="outline"
                className="cursor-default"
                onClick={async () => {
                  try {
                    const message = await toggleSyncDeviceStatus({
                      deviceId: device.id,
                    });
                    toast.success(message);
                    mutate(`api/company-${company?.account?.accountKey}`);
                  } catch (error: unknown) {
                    toast.error(<>{error?.toString()}</>);
                  }
                }}
              >
                {device.isActive ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="destructive"
                className="cursor-default"
                onClick={async () => {
                  try {
                    await deleteSyncDevice({ deviceId: device.id });
                    toast.success("Account deleted successfully");
                    mutate(`api/company-${company?.account?.accountKey}`);
                  } catch (error: unknown) {
                    toast.error(<>{error?.toString()}</>);
                  }
                }}
              >
                Delete
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </React.Fragment>
  );
}
