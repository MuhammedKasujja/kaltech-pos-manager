"use client";

import { useDataUploads } from "@/lib/swr/use-data-uploads";

export default function Page() {
  const { updates, error } = useDataUploads();

  if (error) {
    return <div>{`${error}`}</div>;
  }
  return <div className="md:gap-6 md:p-6">this is okay</div>;
}
