"use client";

import { useSystemUsers } from "@/lib/swr/use-system-users";
import { UserCard } from "./_components/user-card";

export default function Page() {
  const { users, error } = useSystemUsers();
  if (error) return <div>Users</div>;

  return (
    <div className="space-y-4 md:gap-6 md:p-6">
      <div>System Users</div>
      {users?.map((user) => <UserCard user={user} />)}
    </div>
  );
}
