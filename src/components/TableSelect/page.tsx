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
    <div>
      <label className="block mb-2 font-medium">Select Dataset</label>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedTable || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select a table
        </option>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
    </div>
  );
}
