import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { AccountDetails } from "@/features/accounts/actions/get-all-accounts";
import { formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import Link from "next/link";

export const columns: ColumnDef<AccountDetails>[] = [
  {
    accessorKey: "Name",
    header: "Company Name",
    cell: ({ row }) => {
      const account = row.original.account;
      return (
        <Button variant={"link"} asChild>
          <Link
            href={`/admin/accounts/${account?.accountKey}`}
            className="text-foreground"
          >
            {row.original.name}
          </Link>
        </Button>
      );
    },
  },
  {
    id: "Phone",
    accessorKey: "phone",
    header: "Telephone",
  },
  {
    id: "Admin Name",
    accessorKey: "admin.firstName",
    header: "Admin",
  },
  {
    id: "Plan",
    accessorKey: "account.plan",
    header: "Plan",
  },
  {
    id: "license",
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
          {formatDateTime(license?.appliedAt)}
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
        <Button variant={"outline"} asChild>
          <Link href={`/admin/accounts/${company.account?.accountKey}`}>
            View
          </Link>
        </Button>
      );
    },
  },
];
