"use client";

import { columns } from "./columns";
import { CollapsibleDataTable } from "@/components/collapsible-data-table";
import { DataUploadListPreview } from "./data-update-preview";
import { fetchDataUploads } from "../actions/fetch-data-uploads";
import { QueryKeys } from "@/types/data-table";
import React from "react";
import { useDataTable } from "@/hooks/use-data-table";

type DataUploadsTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof fetchDataUploads>>]>;
  queryKeys?: Partial<QueryKeys>;
};

export function DataUploadsTable({
  promises,
  queryKeys,
}: DataUploadsTableProps) {
  const [{ data, totalPages }] = React.use(promises);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: totalPages,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    queryKeys,
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <CollapsibleDataTable
      table={table}
      renderDetails={(upload) => (
        <DataUploadListPreview key={upload.id.toString()} upload={upload} />
      )}
      multiExpand={false}
    />
  );
}
