"use client";

import { useCompanies } from "@/lib/swr/use-companies";

export function CompanyList() {
  const { companies, error } = useCompanies();
  if (error) return <div>{`${error}`}</div>;

  return (
    <div>
      {companies?.map((company) => (
        <div key={company.phone}>{company.name} {company.phone}</div>
      ))}
    </div>
  );
}
