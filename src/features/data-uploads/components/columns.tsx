import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prisma } from "@prisma/client";
import { formatDateTime } from "@/lib/utils";
import { DataUploadDetail } from "../actions";

export const columns: ColumnDef<DataUploadDetail>[] = [
  {
    id: "name",
    header: "Account",
    cell: ({ row }) => {
      const account = row.original.account;
      return <div>{account?.accountKey}</div>;
    },
  },
  {
    accessorKey: "deviceId",
    header: "Device",
  },
  {
    id: "updates_count",
    header: "Changes",
    cell: ({ row }) => {
      const upload = row.original;
      return <div className="text-center">{getUploadsTotal(upload.data)}</div>;
    },
  },
  {
    id: "createdAt",
    header: "Uploaded At",
    cell: ({ row }) => {
      const upload = row.original;
      return <div>{formatDateTime(upload.createdAt)}</div>;
    },
  },
  {
    id: "actions",
    cell: () => {
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
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function getUploadsTotal(value: Prisma.JsonValue): number {
  return Array.isArray(value) ? value.length : 0;
}
