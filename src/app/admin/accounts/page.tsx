import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { accountSearchParamsCache } from "@/features/accounts/types";
import { columns } from "@/features/accounts/components/account-table-columns";
import { AccountsTable } from "@/features/accounts/components/account-table";
import { getValidFilters } from "@/lib/data-table";
import { Suspense } from "react";
import { getAccounts } from "@/features/accounts/actions";

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
    getAccounts({
      ...search,
      filters: validFilters,
    }),
  ]);
  return <AccountsTable promises={promises} />;
}
