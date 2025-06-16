import { Skeleton } from "@/components/ui/skeleton";

export function LoadingShimmer() {
  const totalItems = Array.from<string, string>({ length: 20 }, (v) =>
    (v+1).toString()
  );

  return (
    <div className="space-y-2">
      {totalItems.map((item) => (
        <Skeleton className="h-8" key={item} />
      ))}
    </div>
  );
}
