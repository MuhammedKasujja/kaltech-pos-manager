"use client";

import { useSystemUsers } from "@/features/users/hooks/use-system-users";
import { DataTableLegacy } from "@/components/data-table/data-table-old";
import { columns } from "./columns";
import { SystemUserForm } from "../../../features/users/components/system-user-form";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Page() {
  const { users, error, isLoading } = useSystemUsers();
  if (error) return <div>Could not fetch users</div>;
  if (isLoading)
    return (
      <div className="md:gap-6 md:p-6">
        <DataTableSkeleton
          columnCount={columns.length}
          filterCount={1}
          cellWidths={["10rem", "15rem", "25rem", "6rem"]}
          shrinkZero
        />
      </div>
    );

  return (
    <div className="space-y-4 md:gap-6 md:p-6">
      <DataTableLegacy
        columns={columns}
        data={users ?? []}
        onSearch={() => {}}
        tableActions={() => <SystemUserForm />}
      />
    </div>
  );
}
