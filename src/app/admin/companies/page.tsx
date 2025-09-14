import { CompanyList } from "@/features/company/components/company-list";

export default function Page() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Companies</div>
      <CompanyList />
    </div>
  );
}
