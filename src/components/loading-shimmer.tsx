import { Skeleton } from "@/components/ui/skeleton";

export function LoadingShimmer() {
  const totalItems = Array.from<number, string>({ length: 20 }, () =>
    Math.random().toString(),
  );
  Math.random();
  return (
    <div className="space-y-2">
      {totalItems.map((item) => (
        <Skeleton className="h-8" key={item} />
      ))}
    </div>
  );
}
