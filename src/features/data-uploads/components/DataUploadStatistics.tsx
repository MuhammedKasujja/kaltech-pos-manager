"use client";

import { useDataUploadStatistics } from "../hooks/use-upload-statistics";

export function DataUpdateStatistics() {
  const { statistics, isLoading } = useDataUploadStatistics();

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="flex gap-5">
      <div className="border rounded p-2">
        Total Uploads {statistics?.totalUploads}
      </div>
      <div className="border rounded p-2">
        Weekly Uploads {statistics?.weeklyUploads}
      </div>
      <div className="border rounded p-2">
        Company Uploads {statistics?.accountsWithUploads} /{" "}
        {statistics?.totalAccounts}
      </div>
    </div>
  );
}
