export default function ColdStartNotice({ visible }) {
  if (!visible) return null

  return (
    <div
      role="status"
      className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary animate-fade-in-up"
    >
      <p className="font-medium">Waking up server…</p>
      <p className="text-xs text-primary/80 mt-1">
        The backend may take 30–50 seconds on the first request after inactivity.
      </p>
    </div>
  )
}
