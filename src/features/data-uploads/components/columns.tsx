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
import { Badge } from "@/components/ui/badge";
import { deleteDataUpload } from "../actions/delete-data-upload";
import { toast } from "sonner";
import Link from "next/link";

export const columns: ColumnDef<DataUploadDetail>[] = [
  {
    id: "company",
    header: "Company",
    cell: ({ row }) => {
      const account = row.original.account;
      return (
        <Button variant={"link"} asChild>
          <Link
            href={`/admin/accounts/${account?.accountKey}`}
            className="text-foreground"
          >
            {account?.company.name}
          </Link>
        </Button>
      );
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
      return (
        <div className="w-32">
          <Badge variant="outline" className="text-muted-foreground px-2">
            {getUploadsTotal(upload.data)}
          </Badge>
        </div>
      );
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
    cell: ({ row }) => {
      const upload = row.original;
      async function handleDeleteDataUpload() {
        try {
          await deleteDataUpload({
            updateId: upload.id,
            accountKey: upload.accountKey,
          });
          toast.success("Upload deleted successfully");
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
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteDataUpload}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function getUploadsTotal(value: Prisma.JsonValue): number {
  return Array.isArray(value) ? value.length : 0;
}
