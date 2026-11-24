interface EmptyStateProps {
  title: string
  message?: string
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-700 bg-ink-800/60 px-6 py-14 text-center">
      <p className="text-4xl">🔴</p>
      <h3 className="mt-3 font-display text-3xl tracking-wide text-white">{title}</h3>
      {message && <p className="mt-1 text-sm text-gray-400">{message}</p>}
    </div>
  )
}