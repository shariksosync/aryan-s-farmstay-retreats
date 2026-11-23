// Minimal, dependency-free data table.
export default function DataTable({ columns, rows, rowKey = "id", empty = "No records found.", onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((c) => (
              <th key={c.key} className={`whitespace-nowrap px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground ${c.headClassName || ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-14 text-center text-sm text-muted-foreground">{empty}</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row[rowKey]}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-border/70 last:border-0 transition-colors hover:bg-cream ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3.5 align-middle text-ink ${c.className || ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
