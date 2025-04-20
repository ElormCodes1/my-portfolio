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

  return (
    <div>
      <label className="block mb-2 font-medium">Select Data Fields</label>
      <div className="grid grid-cols-2 gap-2">
        {columns.map((col) => (
          <label key={col} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => toggle(col)}
            />
            <span>{col}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
