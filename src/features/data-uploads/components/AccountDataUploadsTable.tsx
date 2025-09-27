"use client";

import { LoadingShimmer } from "@/components/loading-shimmer";
import { CollapsibleDataTable } from "@/components/collapsible-data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { AccountDataUploadType } from "../schemas";
import { useAccountDataUploads } from "../hooks/use-account-data-uploads";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteDataUpload } from "../actions/delete-data-upload";
import { Prisma } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { EntityUpload } from "../types";
import { formatDataUpload, formatDataUploadList } from "../utils/format-data";
import { JsonPreview } from "./json-preview";

export function AccountDataUploadsTable({
  accountKey,
}: {
  accountKey: string;
}) {
  const { dataUploads, error, isLoading } = useAccountDataUploads({
    accountKey,
  });
  if (error) {
    return <div>{`${error}`}</div>;
  }
  if (isLoading) return <LoadingShimmer />;

  function Preview({ data }: { data: EntityUpload[] }) {
    return data?.map((ele) => (
      <div key={ele.data.uuid}>
        <div>{ele.entity}</div>
        <JsonPreview data={formatDataUpload(ele)}/>
      </div>
    ));
  }

  return (
    <div className="space-y-5">
      <CollapsibleDataTable
        columns={columns}
        data={dataUploads ?? []}
        renderDetails={(upload) => (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(upload.data as EntityUpload[]).map((row) => (
                <TableRow key={row.entityId}>
                  <TableCell>{row.entity}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>
                    {formatDateTime(row.data.updated_at ?? row.data.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        multiExpand={false}
      />
      {/* {dataUploads?.map((upload) => (
        <Preview key={upload.updateId} data={upload.data as EntityUpload[]} />
      ))} */}
      {dataUploads?.map((upload) => (
        <JsonPreview key={upload.updateId} data={formatDataUploadList(upload.data as EntityUpload[])} />
      ))}
    </div>
  );
}

const columns: ColumnDef<AccountDataUploadType>[] = [
  {
    id: "company",
    header: "Company",
    cell: ({ row }) => {
      const account = row.original.account;
      return <Button variant={"link"}>{account?.company.name}</Button>;
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
