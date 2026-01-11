import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react";

export function SyncDeviceStatus({ status }: { status: boolean }) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {status ? (
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
      ) : (
        <IconXboxXFilled className="fill-red-500 dark:fill-red-400" />
      )}
      {status ? "Enabled" : "Disabled"}
    </Badge>
  );
}
