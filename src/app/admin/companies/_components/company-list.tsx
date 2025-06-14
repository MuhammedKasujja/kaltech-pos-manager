"use client";

import { useCompanies } from "@/lib/swr/use-companies";

export default function CompanyList() {
  const { companies, error } = useCompanies();
  if (error) return <div>{`${error}`}</div>;

  return (
    <div>
        flkfkl
      {companies?.map((company) => (
        <div key={company.phone}>{company.name}</div>
      ))}
    </div>
  );
}
