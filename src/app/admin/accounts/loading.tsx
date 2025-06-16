import { LoadingShimmer } from "@/components/loading-shimmer";

export default function Loading() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <LoadingShimmer />
    </div>
  );
}
