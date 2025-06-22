"use client";
import { AccountDetail } from "@/lib/swr/use-accounts";
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
import { generateCompanyLicence } from "@/lib/licence/generate-license";
import { toast } from "sonner";
import { deleteAccount } from "@/lib/account/delete-account";
import { formatDateTime } from "@/lib/utils";

export const columns: ColumnDef<AccountDetail>[] = [
  {
    accessorKey: "company.name",
    header: "Company Name",
  },
  {
    accessorKey: "accountKey",
    header: "Account Key",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    id: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const account = row.original;
      return <>{formatDateTime(account.createdAt)}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;
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
              onClick={async () => {
                try {
                  await generateCompanyLicence(account.accountKey);
                  toast.success("Licence generated successfully");
                } catch (error: unknown) {
                  toast.error(<>{error?.toString()}</>);
                }
              }}
            >
              Generate Licence
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await deleteAccount(account.id);
                  toast.success("Account deleted successfully");
                } catch (error: unknown) {
                  toast.error(<>{error?.toString()}</>);
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
