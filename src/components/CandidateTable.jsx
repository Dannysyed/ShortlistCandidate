import { useState } from "react";
import CandidateDetailModal from "./CandidateDetailModal";

const getVerdictColor = (verdict) => {
  switch (verdict) {
    case "Strong Interview":
      return "#2e7d32"; // Dark green
    case "Interview":
      return "#4caf50"; // Green
    case "Screen Further":
      return "#f57c00"; // Orange
    case "Maybe":
      return "#fbc02d"; // Yellow
    case "Reject":
      return "#d32f2f"; // Red
    default:
      return "#999";
  }
};

const getVerdictBgColor = (verdict) => {
  switch (verdict) {
    case "Strong Interview":
      return "#e8f5e9"; // Light green
    case "Interview":
      return "#e8f5e9"; // Light green
    case "Screen Further":
      return "#fff3e0"; // Light orange
    case "Maybe":
      return "#fffde7"; // Light yellow
    case "Reject":
      return "#ffebee"; // Light red
    default:
      return "#f5f5f5";
  }
};

export default function CandidateTable({
  data,
  selectedIds = new Set(),
  onSelectCandidate = () => {},
  onSelectAll = () => {},
  onStatusChange = () => {},
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "score",
    direction: "desc",
  });
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "desc"
        ? bValue - aValue
        : aValue - bValue;
    }

    const aStr = String(aValue || "").toLowerCase();
    const bStr = String(bValue || "").toLowerCase();

    if (sortConfig.direction === "desc") {
      return bStr.localeCompare(aStr);
    }
    return aStr.localeCompare(bStr);
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "desc" ? " ↓" : " ↑";
  };

  const handleRowSelect = (candidateId, e) => {
    if (e.target.type === "checkbox") {
      onSelectCandidate(candidateId);
    }
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
    fontSize: 14,
  };

  const thStyle = {
    backgroundColor: "#f5f5f5",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #eee",
  };

  const verdictStyle = (verdict) => ({
    ...tdStyle,
    backgroundColor: getVerdictBgColor(verdict),
    color: getVerdictColor(verdict),
    fontWeight: "bold",
    textAlign: "center",
  });

  return (
    <div style={{ overflowX: "auto" }}>
      {data.length === 0 ? (
        <div style={{ textAlign: "center", padding: 20, color: "#999" }}>
          No candidates match your filters. Upload a CSV file or adjust filters.
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 10, fontSize: 12, color: "#666" }}>
            Showing {sortedData.length} candidate
            {sortedData.length !== 1 ? "s" : ""} (Click row for details)
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 40 }}>
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === sortedData.length &&
                      sortedData.length > 0
                    }
                    onChange={onSelectAll}
                    style={{ cursor: "pointer", width: 18, height: 18 }}
                  />
                </th>
                <th style={thStyle} onClick={() => handleSort("name")}>
                  Name{getSortIndicator("name")}
                </th>
                <th style={thStyle} onClick={() => handleSort("institute")}>
                  Institute{getSortIndicator("institute")}
                </th>
                <th style={thStyle} onClick={() => handleSort("city")}>
                  City{getSortIndicator("city")}
                </th>
                <th style={thStyle}>Links</th>
                <th style={thStyle}>React</th>
                <th style={thStyle} onClick={() => handleSort("score")}>
                  Score{getSortIndicator("score")}
                </th>
                <th style={thStyle} onClick={() => handleSort("verdict")}>
                  Verdict{getSortIndicator("verdict")}
                </th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((candidate, idx) => {
                const isSelected = selectedIds.has(candidate.id);
                const customStatus = candidate.customStatus;

                return (
                  <tr
                    key={idx}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isSelected
                        ? "#fff3e0"
                        : idx % 2 === 0
                          ? "#fafafa"
                          : "white",
                      transition: "background-color 0.2s",
                      borderLeft: isSelected ? "4px solid #ff9800" : "none",
                    }}
                    onMouseOver={(e) =>
                      !isSelected &&
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseOut={(e) =>
                      !isSelected &&
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#fafafa" : "white")
                    }
                  >
                    <td style={{ ...tdStyle, width: 40, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectCandidate(candidate.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: "pointer", width: 18, height: 18 }}
                      />
                    </td>
                    <td
                      style={tdStyle}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <strong>{candidate.name || "—"}</strong>
                    </td>
                    <td
                      style={{ ...tdStyle, fontSize: 13, color: "#666" }}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {candidate.institute || "—"}
                    </td>
                    <td
                      style={tdStyle}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {candidate.city || "—"}
                    </td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {candidate.github && (
                          <a
                            href={candidate.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#2196f3",
                              textDecoration: "none",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                            onClick={(e) => e.stopPropagation()}
                            title="GitHub Profile"
                          >
                            👤
                          </a>
                        )}
                        {candidate.resume && (
                          <a
                            href={candidate.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#ff6f00",
                              textDecoration: "none",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                            onClick={(e) => e.stopPropagation()}
                            title="Resume / Portfolio"
                          >
                            📄
                          </a>
                        )}
                        {!candidate.github && !candidate.resume && (
                          <span style={{ color: "#ccc" }}>—</span>
                        )}
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {candidate.skills?.react ? (
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor:
                              candidate.skills.react >= 2
                                ? "#4caf50"
                                : candidate.skills.react >= 1
                                  ? "#ffc107"
                                  : "#ddd",
                            color:
                              candidate.skills.react >= 2 ? "white" : "#333",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontWeight: "bold",
                          }}
                        >
                          {candidate.skills.react}/3
                        </span>
                      ) : (
                        <span style={{ color: "#ccc" }}>—</span>
                      )}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#667eea",
                      }}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {candidate.score}/{candidate.maxScore}
                    </td>
                    <td style={verdictStyle(candidate.verdict)}>
                      {customStatus ? (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            backgroundColor:
                              customStatus === "shortlist"
                                ? "#c8e6c9"
                                : customStatus === "interview"
                                  ? "#bbdefb"
                                  : "#ffcdd2",
                            borderRadius: 4,
                            color:
                              customStatus === "shortlist"
                                ? "#2e7d32"
                                : customStatus === "interview"
                                  ? "#1976d2"
                                  : "#c62828",
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          {customStatus === "shortlist"
                            ? "✓ Shortlist"
                            : customStatus === "interview"
                              ? "📋 Interview"
                              : "✕ Reject"}
                        </span>
                      ) : (
                        candidate.verdict
                      )}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      <select
                        value={customStatus || "none"}
                        onChange={(e) => {
                          e.stopPropagation();
                          onStatusChange(
                            candidate.id,
                            e.target.value === "none" ? null : e.target.value,
                          );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 4,
                          border: "1px solid #ddd",
                          cursor: "pointer",
                          backgroundColor: "white",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        <option value="none">—</option>
                        <option value="shortlist">✓ Shortlist</option>
                        <option value="interview">📋 Interview</option>
                        <option value="reject">✕ Reject</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
