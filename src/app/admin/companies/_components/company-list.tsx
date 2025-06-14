"use client";

import { useCompanies } from "@/lib/swr/use-companies";
import { CompanyCard } from "./company-card";

export function CompanyList() {
  const { companies, error } = useCompanies();
  if (error) return <div>{`${error}`}</div>;

  return (
    <div className="flex flex-wrap">
      {companies?.map((company) => (
        <CompanyCard key={company.phone} company={company} />
      ))}
    </div>
  );
}
