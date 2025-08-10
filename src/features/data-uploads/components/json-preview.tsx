export function JsonPreview({ data }: { data: unknown }) {
  return (
    <pre className="bg-sidebar rounded-md p-4 overflow-x-auto">
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
