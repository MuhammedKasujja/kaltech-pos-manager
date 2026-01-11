import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { columns } from "@/features/accounts/components/account-table-columns";

export default function Loading() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <DataTableSkeleton
        columnCount={columns.length}
        filterCount={1}
        shrinkZero
      />
    </div>
  );
}
