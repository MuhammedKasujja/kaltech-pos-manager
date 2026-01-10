import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { getSyncDevices } from "@/features/sync-device/actions";
import { columns } from "@/features/sync-device/components/sync-device-columns";
import { SyncDeviceTable } from "@/features/sync-device/components/sync-device-table";
import { syncDeviceSearchParamsCache } from "@/features/sync-device/types";
import { getValidFilters } from "@/lib/data-table";
import { SearchParams } from "@/types";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default function Page(props: PageProps) {
  return (
    <Shell>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={columns.length}
            filterCount={1}
            shrinkZero
          />
        }
      >
        <SyncDeviceTableWrapper {...props} />
      </Suspense>
    </Shell>
  );
}

async function SyncDeviceTableWrapper(props: PageProps) {
  const searchParams = await props.searchParams;
  const search = syncDeviceSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getSyncDevices({
      ...search,
      filters: validFilters,
    }),
  ]);
  return <SyncDeviceTable promises={promises} />;
}
