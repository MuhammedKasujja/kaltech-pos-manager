"use client";

import { useSystemUsers } from "@/lib/swr/use-system-users";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { CreateUserForm } from "./_components/create-user-form";
import { LoadingShimmer } from "@/components/loading-shimmer";

export default function Page() {
  const { users, error, isLoading } = useSystemUsers();
  if (error) return <div>Users</div>;
  if (isLoading)
    return (
      <div className="md:gap-6 md:p-6">
        <LoadingShimmer />
      </div>
    );

  return (
    <div className="space-y-4 md:gap-6 md:p-6">
      <div className="flex justify-between">
        <div>System Users</div>
        <CreateUserForm />
      </div>
      <DataTable columns={columns} data={users ?? []} />
    </div>
  );
}
