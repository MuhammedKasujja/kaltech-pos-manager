import { DataUploadsTable } from "@/features/data-uploads/components/data-uploads-table";
import { DataUploadStatisticsCard } from "@/features/data-uploads/components/data-upload-statistics-card";
import { Shell } from "@/components/shell";
import { Suspense } from "react";
import { getValidFilters } from "@/lib/data-table";
import { fetchDataUploads } from "@/features/data-uploads/actions/fetch-data-uploads";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { columns } from "@/features/data-uploads/components/columns";
import { dataUploadSearchParamsCache } from "@/features/data-uploads/types";
import { getDataUploadStatistics } from "@/features/data-uploads/actions/upload-statistics";

export default async function DataUploadsPage(
  props: PageProps<"/admin/data-uploads">,
) {
  const statistics = await getDataUploadStatistics();
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
        <DataUploadStatisticsCard data={statistics} />
        <DataUploadsTableWrapper {...props} />
      </Suspense>
    </Shell>
  );
}

async function DataUploadsTableWrapper(
  props: PageProps<"/admin/data-uploads">,
) {
  const searchParams = await props.searchParams;
  const search = dataUploadSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    fetchDataUploads({
      ...search,
      filters: validFilters,
    }),
  ]);
  return <DataUploadsTable promises={promises} />;
}
