import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CompanyDetail } from "@/lib/swr/use-companies";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import Link from "next/link";

export const columns: ColumnDef<CompanyDetail>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
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
        <Button variant={"outline"} asChild>
          <Link href={`/admin/companies/${company.account?.accountKey}`}>
            View
          </Link>
        </Button>
      );
    },
  },
];
