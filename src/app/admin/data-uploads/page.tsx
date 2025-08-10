// import { DataUploadJsonViewer } from "@/features/data-uploads/components/DataUploadsJsonViewer";
import { DataUploadsTable } from "@/features/data-uploads/components/DataUploadsTable";

export default function DataUploadsPage() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Data Updates</div>
      <DataUploadsTable />
    </div>
  );
}
