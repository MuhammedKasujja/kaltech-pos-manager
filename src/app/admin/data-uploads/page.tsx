import { DataUploadsTable } from "@/features/data-uploads/components/DataUploadsTable";
import { DataUpdateStatistics } from "@/features/data-uploads/components/DataUploadStatistics";

export default async function DataUploadsPage() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Data Updates</div>
      <DataUpdateStatistics/>
      <DataUploadsTable />
    </div>
  );
}
