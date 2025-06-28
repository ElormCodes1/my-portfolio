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
        : [...selectedColumns, col]
    );
  };

  const selectAll = () => {
    onChange(columns);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select columns to display
        </label>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {selectedColumns.length} of {columns.length} selected
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={selectAll}
          disabled={selectedColumns.length === columns.length}
          className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          disabled={selectedColumns.length === 0}
          className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Column Grid */}
      <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
        {columns.map((col) => (
          <label
            key={col}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-white dark:hover:bg-gray-600 cursor-pointer transition-colors group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col)}
                onChange={() => toggle(col)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-800 dark:border-gray-600"
              />
              {selectedColumns.includes(col) && (
                <svg className="absolute inset-0 w-4 h-4 text-blue-600 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {col.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </label>
        ))}
      </div>

      {selectedColumns.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-700 dark:text-green-300 font-medium">
              Ready to explore {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
