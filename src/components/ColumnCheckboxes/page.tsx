type Props = {
  columns: string[];
  selectedColumns: string[];
  onChange: (cols: string[]) => void;
};

export default function ColumnCheckboxes({
  columns,
  selectedColumns,
  onChange,
}: Props) {
  const toggle = (col: string) => {
    onChange(
      selectedColumns.includes(col)
        ? selectedColumns.filter((c) => c !== col)
        : [...selectedColumns, col],
    );
  };

  const selectAll = () => onChange(columns);
  const clearAll = () => onChange([]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-frost">
          Select columns to display
        </label>
        <span className="shrink-0 font-mono text-xs text-steel">
          {selectedColumns.length} of {columns.length} selected
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectAll}
          disabled={selectedColumns.length === columns.length}
          className="rounded-md border border-[var(--color-border)] bg-ink-muted px-3 py-1 font-mono text-xs text-frost transition-colors hover:border-radar/40 hover:text-radar disabled:cursor-not-allowed disabled:opacity-50"
        >
          Select all
        </button>
        <button
          type="button"
          onClick={clearAll}
          disabled={selectedColumns.length === 0}
          className="rounded-md border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-steel transition-colors hover:border-radar/40 hover:text-radar disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear all
        </button>
      </div>

      <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-ink-muted p-3">
        {columns.map((col) => (
          <label
            key={col}
            className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-ink-elevated"
          >
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => toggle(col)}
              className="h-4 w-4 rounded border-[var(--color-border)] bg-ink-elevated text-radar accent-radar focus:ring-radar/40"
            />
            <span className="text-sm text-steel">
              {col.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
