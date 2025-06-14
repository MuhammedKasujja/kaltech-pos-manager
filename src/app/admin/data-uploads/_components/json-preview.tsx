export function JsonPreview({ data }: { data: any }) {
  return (
    <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  )
}