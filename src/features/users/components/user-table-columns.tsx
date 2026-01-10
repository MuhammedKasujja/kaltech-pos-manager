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
import { SystemUserForm } from "@/features/users/components/system-user-form";
import { formatDateTime } from "@/lib/format";
import { SystemUser } from "../actions/get-users";

export const columns: ColumnDef<SystemUser>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          {user.firstName} {user.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const account = row.original;
      return <>{formatDateTime(account.createdAt)}</>;
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
            <DropdownMenuItem asChild>
              <SystemUserForm
                trigger={<Button variant={"ghost"}>Edit</Button>}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
