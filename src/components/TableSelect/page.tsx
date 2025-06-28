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
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Choose a dataset to explore
      </label>
      <div className="relative">
        <select
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
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
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {selectedTable && (
        <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Dataset selected: {selectedTable.replace(/_/g, " ").toUpperCase()}
        </div>
      )}
    </div>
  );
}
