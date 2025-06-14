import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";

export function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardContent className="space-y-2.5">
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <div>{user.email}</div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{user.createdAt.toString()}</div>
      </CardFooter>
    </Card>
  );
}
