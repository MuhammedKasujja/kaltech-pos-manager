import { accountSearchParamsCache } from "@/features/accounts/types";
import { getCompanies } from "@/features/company/actions/get-all-companies";
import { CompanyTable } from "@/features/company/components/company-table";
import { getValidFilters } from "@/lib/data-table";
import { SearchParams } from "@/types";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default function Page(props: PageProps) {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <CompanyTableWrapper {...props} />
    </div>
  );
}

async function CompanyTableWrapper(props: PageProps) {
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
