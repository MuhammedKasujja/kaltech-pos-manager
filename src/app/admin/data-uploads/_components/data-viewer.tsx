"use client";

import { useDataUploads } from "@/lib/swr/use-data-uploads";
import { JsonPreview } from "./json-preview";

export function DataViewer() {
  const { updates, error } = useDataUploads();

  if (error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <div>
      {updates?.map((update) => (
        <JsonPreview key={update.id.toString()} data={update} />
      ))}
    </div>
  );
}
