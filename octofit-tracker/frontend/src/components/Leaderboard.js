import React, { useEffect, useState } from "react";

export default function LeaderboardComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // prevents setState on unmounted component

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Expecting data to be an array. If your API returns {items: []}, adjust here.
        const list = data;

        if (isMounted) setRows(list);
      } catch (e) {
        if (isMounted) setError(e.message || "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-detect columns from the first row
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <h3 style={{ marginBottom: 12 }}>Activities log</h3>

      {loading && <div>Loading…</div>}

      {!loading && error && (
        <div style={{ color: "crimson" }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div>No data</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              minWidth: 600,
            }}
          >
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      textAlign: "left",
                      padding: "10px 8px",
                      borderBottom: "2px solid #ddd",
                      background: "#fafafa",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id ?? idx}>
                  {columns.map((col) => (
                    <td
                      key={col}
                      style={{
                        padding: "10px 8px",
                        borderBottom: "1px solid #eee",
                        verticalAlign: "top",
                      }}
                    >
                      {formatCell(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatCell(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
