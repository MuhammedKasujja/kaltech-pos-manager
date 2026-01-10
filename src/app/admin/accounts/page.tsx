import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { accountSearchParamsCache } from "@/features/accounts/types";
import { getCompanies } from "@/features/company/actions/get-all-companies";
import { columns } from "@/features/company/components/columns";
import { CompanyTable } from "@/features/company/components/company-table";
import { getValidFilters } from "@/lib/data-table";
import { Suspense } from "react";

export default function Page(props: PageProps<"/admin/accounts">) {
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
        <CompanyTableWrapper {...props} />
      </Suspense>
    </Shell>
  );
}

async function CompanyTableWrapper(props: PageProps<"/admin/accounts">) {
  const searchParams = await props.searchParams;
  const search = accountSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getCompanies({
      ...search,
      filters: validFilters,
    }),
  ]);
  return <CompanyTable promises={promises} />;
}
