import { DataViewer } from "./_components/data-viewer";

export default function Page() {
  return (
    <div className="md:gap-6 md:p-6 space-y-6">
      <div>Data Updates</div>
      <DataViewer />
    </div>
  );
}
