"use client";

import { columns } from "./columns";
import { useDataUploads } from "@/features/data-uploads/hooks/use-data-uploads";
import { LoadingShimmer } from "@/components/loading-shimmer";
import { CollapsibleDataTable } from "@/components/collapsible-data-table";
import { DataUploadListPreview } from "./DataUpdatePreview";

export function DataUploadsTable() {
  const { updates, error, isLoading } = useDataUploads();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  if (isLoading) return <LoadingShimmer />;

  return (
    <CollapsibleDataTable
      columns={columns}
      data={updates ?? []}
      renderDetails={(upload) => (
        <DataUploadListPreview key={upload.id.toString()} upload={upload} />
      )}
      multiExpand={false}
    />
  );
}
