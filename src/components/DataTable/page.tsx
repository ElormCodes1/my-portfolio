type Props = {
  columns: string[];
  data: Record<string, unknown>[];
};

export default function DataTable({ columns, data }: Props) {
  if (data.length === 0) return null;

  const columnWidths: Record<string, string> = {
    name: "w-[150px]",
    email: "w-[200px]",
    title: "w-[200px]",
    telephone: "w-[150px]",
    linkedin_url: "w-[250px]",
    description: "w-[300px]",
    long_description: "w-[400px]",
    address: "w-[300px]",
    image_url: "w-[250px]",
  };

  const formatCell = (value: unknown) => {
    if (Array.isArray(value)) return value.join(", ");
    if (value === null || value === undefined) return "";
    return String(value);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
      <table className="table-fixed min-w-full border-collapse">
        <thead className="bg-ink-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={`border border-[var(--color-border)] px-4 py-2.5 text-left font-mono text-xs font-medium uppercase tracking-wider text-frost ${
                  columnWidths[col] || "w-[200px]"
                }`}
              >
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-ink-elevated">
          {data.map((row, i) => (
            <tr
              key={i}
              className="transition-colors hover:bg-ink-muted/80"
            >
              {columns.map((col) => {
                const cell = formatCell(row[col]);
                return (
                  <td
                    key={col}
                    className={`border border-[var(--color-border)] px-4 py-2.5 align-top text-sm text-steel ${
                      columnWidths[col] || "w-[200px]"
                    } truncate`}
                  >
                    <span title={cell}>{cell}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
