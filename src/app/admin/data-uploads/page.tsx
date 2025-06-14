"use client";

import { useDataUploads } from "@/lib/swr/use-data-uploads";

export default function Page() {
  const { updates, error } = useDataUploads();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  return <div>this is okay</div>;
}
