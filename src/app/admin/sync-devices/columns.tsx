import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SyncDevice } from "@prisma/client";
import { deleteSyncDevice } from "@/lib/sync-device/delete-sync-device";
import { toast } from "sonner";

export const columns: ColumnDef<SyncDevice>[] = [
  {
    accessorKey: "accountKey",
    header: "Account Key",
  },
  {
    accessorKey: "userName",
    header: "User",
  },
  {
    accessorKey: "deviceId",
    header: "Device ID",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const device = row.original;
      async function handleDeleteDevice() {
        try {
          await deleteSyncDevice({ deviceId: device.id });
          toast.success("Device deleted successfully");
        } catch (error: unknown) {
          toast.error(`${error?.toString()}`);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteDevice}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
