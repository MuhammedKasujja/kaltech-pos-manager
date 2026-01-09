import { DataUploadsTable } from "@/features/data-uploads/components/data-uploads-table";
import { DataUploadStatisticsCard } from "@/features/data-uploads/components/data-upload-statistics-card";

export default async function DataUploadsPage() {
  return (
    <div className="space-y-6 py-6">
      <DataUploadStatisticsCard />
      <div className="md:px-6">
        <DataUploadsTable />
      </div>
    </div>
  );
}
