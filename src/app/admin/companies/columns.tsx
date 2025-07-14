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
import { CompanyDetail } from "@/lib/swr/use-companies";
import { toast } from "sonner";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";

export const columns: ColumnDef<CompanyDetail>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Telephone",
  },
  {
    accessorKey: "admin.firstName",
    header: "Admin",
  },
  {
    accessorKey: "admin.email",
    header: "Admin Email",
  },
  {
    id: "status",
    header: "License Applied",
    cell: ({ row }) => {
      const company = row.original;
      const license = company.account?.licence.at(
        company.account?.licence.length - 1
      );

      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {license?.isApplied ? (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          ) : (
            <IconLoader />
          )}
          {license?.appliedAt && formatDateTime(license?.appliedAt)}
        </Badge>
      );
    },
  },
  {
    id: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const company = row.original;
      return <>{formatDateTime(company.createdAt)}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;

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
            <DropdownMenuItem
              onClick={() => {
                const license = company.account?.licence.at(
                  company.account?.licence.length - 1
                );
                if (!license) {
                  toast.error("No license key found");
                  return;
                }
                navigator.clipboard.writeText(license?.licenceKey ?? "");
                toast.info("License key copied");
              }}
            >
              Copy License key
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
