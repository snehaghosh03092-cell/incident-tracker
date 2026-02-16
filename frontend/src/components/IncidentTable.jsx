import { useNavigate } from "react-router-dom";

const IncidentTable = ({
  incidents = [],
  loading,
  sortBy,
  sortOrder,
  onSortChange,
  }) => {

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="table-card" style={{ padding: "20px" }}>
        Loading incidents...
      </div>
    );
  }

  if (!incidents.length) {
    return (
      <div className="table-card" style={{ padding: "20px" }}>
        No incidents found.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="table-card">
      <table>
      <thead>
        <tr>
          <th onClick={() => onSortChange("title")}>
            Title {sortBy === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th>Service</th>
          <th>Owner</th>
          <th onClick={() => onSortChange("severity")}>
            Severity {sortBy === "severity" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th>Status</th>
          <th>Summary</th>
          <th onClick={() => onSortChange("updated_at")} className="sortable">
            <div className="th-content">
              <span>Updated</span>
              <span className="sort-icon">
                {sortBy === "updated_at"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : "⇅"}
              </span>
            </div>
          </th>
          <th onClick={() => onSortChange("created_at")} className="sortable">
            <div className="th-content">
              <span>Created</span>
              <span className="sort-icon">
                {sortBy === "created_at"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : "⇅"}
              </span>
            </div>
          </th>
        </tr>
      </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr
              key={inc.id}
              onClick={() => navigate(`/incidents/${inc.id}`)}
            >
              <td>{inc.title}</td>
              <td>{inc.service}</td>
              <td>{inc.owner ? inc.owner : ""}</td>              
              <td>
                <span className={`badge ${(inc.severity || "").toLowerCase()}`}>
                  {inc.severity}
                </span>
              </td>
              <td>
                <span className={`badge ${(inc.status || "").toLowerCase()}`}>
                  {inc.status}
                </span>
              </td>
              <td>
                <div
                  className="summary-cell"
                  title={inc.summary || ""}
                >
                  {inc.summary || "-"}
                </div>
              </td>
              <td>
                {(() => {
                  const d = formatDate(inc.updated_at);
                  return (
                    <div className="date-cell">
                      <div>{d.date}</div>
                      <div className="time-text">{d.time}</div>
                    </div>
                  );
                })()}
              </td>
            <td>
              {(() => {
                const d = formatDate(inc.created_at);
                return (
                  <div className="date-cell">
                    <div>{d.date}</div>
                    <div className="time-text">{d.time}</div>
                  </div>
                );
              })()}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
