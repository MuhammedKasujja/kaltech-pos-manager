import { DataUploadsTable } from "@/features/data-uploads/components/DataUploadsTable";

export default function DataUploadsPage() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Data Updates</div>
      <div className="flex gap-5">
        <div className="border rounded p-2">Total Uploads 50</div>
        <div className="border rounded p-2">Week 20</div>
        <div className="border rounded p-2">Company Uploads 10</div>
      </div>
      <DataUploadsTable />
    </div>
  );
}
