type Props = {
  columns: string[];
  data: any[];
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

  return (
    //   <div className="overflow-x-auto mt-6 border rounded">
    //     <table className="min-w-full border-collapse">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           {columns.map((col) => (
    //             <th key={col} className="px-4 py-2 border">
    //               {col}
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((row, i) => (
    //           <tr key={i} className="hover:bg-gray-50">
    //             {columns.map((col) => (
    //               <td key={col} className="px-4 py-2 border">
    //                 {row[col]}
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="table-fixed min-w-full divide-y border border-gray-700 divide-gray-700">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={`px-4 py-2 text-left text-sm font-semibold tracking-wider ${
                  columnWidths[col] || "w-[200px]"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900 text-white">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800">
              {columns.map((col) => (
                <td
                  key={col}
                  className={`px-4 py-2 text-sm align-top truncate border border-gray-700${
                    columnWidths[col] || "w-[200px]"
                  }`}
                >
                  <span
                    title={
                      Array.isArray(row[col]) ? row[col].join(", ") : row[col]
                    }
                  >
                    {Array.isArray(row[col]) ? row[col].join(", ") : row[col]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
