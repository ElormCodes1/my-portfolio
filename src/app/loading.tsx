export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-radar border-t-transparent"
          aria-hidden
        />
        <p className="label-mono text-steel">Loading…</p>
      </div>
    </div>
  );
}
