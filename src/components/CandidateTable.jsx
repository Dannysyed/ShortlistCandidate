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

export default function CandidateTable({ data }) {
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
                <th style={thStyle} onClick={() => handleSort("name")}>
                  Name{getSortIndicator("name")}
                </th>
                <th style={thStyle} onClick={() => handleSort("institute")}>
                  Institute{getSortIndicator("institute")}
                </th>
                <th style={thStyle} onClick={() => handleSort("city")}>
                  City{getSortIndicator("city")}
                </th>
                <th style={thStyle}>GitHub</th>
                <th style={thStyle}>React</th>
                <th style={thStyle} onClick={() => handleSort("score")}>
                  Score{getSortIndicator("score")}
                </th>
                <th style={thStyle} onClick={() => handleSort("verdict")}>
                  Verdict{getSortIndicator("verdict")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((candidate, idx) => (
                <tr
                  key={idx}
                  style={{
                    cursor: "pointer",
                    backgroundColor: idx % 2 === 0 ? "#fafafa" : "white",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "#fafafa" : "white")
                  }
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <td style={tdStyle}>
                    <strong>{candidate.name || "—"}</strong>
                  </td>
                  <td style={{ ...tdStyle, fontSize: 13, color: "#666" }}>
                    {candidate.institute || "—"}
                  </td>
                  <td style={tdStyle}>{candidate.city || "—"}</td>
                  <td style={tdStyle}>
                    {candidate.github ? (
                      <a
                        href={candidate.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#2196f3",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {candidate.githubStatus === "valid-profile"
                          ? "👤 Profile"
                          : candidate.githubStatus === "valid-repo"
                            ? "📦 Repo"
                            : "🔗 Link"}
                      </a>
                    ) : (
                      <span style={{ color: "#ccc" }}>—</span>
                    )}
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
                          color: candidate.skills.react >= 2 ? "white" : "#333",
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
                  >
                    {candidate.score}/{candidate.maxScore}
                  </td>
                  <td style={verdictStyle(candidate.verdict)}>
                    {candidate.verdict}
                  </td>
                </tr>
              ))}
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
