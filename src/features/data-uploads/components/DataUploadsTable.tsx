"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useDataUploads } from "@/lib/swr/use-data-uploads";
import { LoadingShimmer } from "@/components/loading-shimmer";

export function DataUploadsTable() {
  const { updates, error, isLoading } = useDataUploads();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  if (isLoading) return <LoadingShimmer />;

  return <DataTable columns={columns} data={updates ?? []} />;
}
