type Props = {
  tables: string[];
  selectedTable: string | null;
  onChange: (value: string) => void;
};

export default function TableSelect({
  tables,
  selectedTable,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-frost">
        Choose a dataset to explore
      </label>
      <div className="relative">
        <select
          className="input-lab cursor-pointer appearance-none pr-10"
          value={selectedTable || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select a dataset...
          </option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-steel"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {selectedTable && (
        <p className="flex items-center gap-1 font-mono text-xs text-signal">
          <span aria-hidden="true">✓</span>
          {selectedTable.replace(/_/g, " ").toUpperCase()}
        </p>
      )}
    </div>
  );
}
