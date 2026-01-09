import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { columns } from "./columns";

export default function Loading() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        cellWidths={[
          "10rem",
          "10rem",
          "15rem",
          "6rem",
          "10rem",
          "10rem",
          "6rem",
        ]}
        shrinkZero
      />
    </div>
  );
}
