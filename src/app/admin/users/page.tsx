"use client";

import { useSystemUsers } from "@/features/users/hooks/use-system-users";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { SystemUserForm } from "../../../features/users/components/system-user-form";
import { LoadingShimmer } from "@/components/loading-shimmer";

export default function Page() {
  const { users, error, isLoading } = useSystemUsers();
  if (error) return <div>Could not fetch users</div>;
  if (isLoading)
    return (
      <div className="md:gap-6 md:p-6">
        <LoadingShimmer />
      </div>
    );

  return (
    <div className="space-y-4 md:gap-6 md:p-6">
      <div className="flex justify-end">
        <SystemUserForm />
      </div>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  );
}
