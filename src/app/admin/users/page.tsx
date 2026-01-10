import { columns } from "@/features/users/components/user-table-columns";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { UsersTable } from "@/features/users/components/user-table";
import { getUsers } from "@/features/users/actions/get-users";
import { getValidFilters } from "@/lib/data-table";
import { userSearchParamsCache } from "@/features/users/types";
import { SearchParams } from "@/types";
import { Shell } from "@/components/shell";
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
        <UsersTableWrapper {...props} />
      </Suspense>
    </Shell>
  );
}

async function UsersTableWrapper(props: PageProps) {
  const searchParams = await props.searchParams;
  const search = userSearchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getUsers({
      ...search,
      filters: validFilters,
    }),
  ]);
  return <UsersTable promises={promises} />;
}
