import { useState } from "react";
import FileUpload from "./components/FileUpload";
import CandidateTable from "./components/CandidateTable";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleData = (scoredCandidates) => {
    // Data comes already scored from FileUpload component
    const candidatesWithId = scoredCandidates.map((c, idx) => ({
      ...c,
      id: c.id || `${c.name}-${idx}`,
    }));
    setCandidates(candidatesWithId);
    setFilteredCandidates(candidatesWithId);
    setSelectedIds(new Set());
    setSelectedStatus({});
  };

  const handleFilter = (filtered) => {
    setFilteredCandidates(filtered);
  };

  const handleSelectCandidate = (candidateId) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId);
      const newStatus = { ...selectedStatus };
      delete newStatus[candidateId];
      setSelectedStatus(newStatus);
    } else {
      newSelected.add(candidateId);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredCandidates.length) {
      setSelectedIds(new Set());
      setSelectedStatus({});
    } else {
      const allIds = new Set(filteredCandidates.map((c) => c.id));
      setSelectedIds(allIds);
    }
  };

  const handleBulkAction = (action) => {
    const newStatus = { ...selectedStatus };
    selectedIds.forEach((id) => {
      newStatus[id] = action;
    });
    setSelectedStatus(newStatus);
    setSelectedIds(new Set());
  };

  const handleStatusChange = (candidateId, status) => {
    const newStatus = { ...selectedStatus };
    newStatus[candidateId] = status;
    setSelectedStatus(newStatus);
  };

  const stats = {
    strongInterview: filteredCandidates.filter(
      (c) => c.verdict === "Strong Interview",
    ).length,
    interview: filteredCandidates.filter((c) => c.verdict === "Interview")
      .length,
    screenFurther: filteredCandidates.filter(
      (c) => c.verdict === "Screen Further",
    ).length,
    maybe: filteredCandidates.filter((c) => c.verdict === "Maybe").length,
    reject: filteredCandidates.filter((c) => c.verdict === "Reject").length,
  };

  const enrichedCandidates = filteredCandidates.map((c) => ({
    ...c,
    customStatus: selectedStatus[c.id] || null,
  }));

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Intern Shortlisting Tool</h1>
        <p>Upload Internshala CSV and manually select top candidates</p>
      </header>

      <main className="app-main">
        <FileUpload onData={handleData} />

        {candidates.length > 0 && (
          <>
            <div className="stats-container">
              <div className="stat-card strong-interview">
                <div className="stat-number">{stats.strongInterview}</div>
                <div className="stat-label">Strong Interview</div>
              </div>
              <div className="stat-card interview">
                <div className="stat-number">{stats.interview}</div>
                <div className="stat-label">Interview</div>
              </div>
              <div className="stat-card screen">
                <div className="stat-number">{stats.screenFurther}</div>
                <div className="stat-label">Screen Further</div>
              </div>
              <div className="stat-card maybe">
                <div className="stat-number">{stats.maybe}</div>
                <div className="stat-label">Maybe</div>
              </div>
              <div className="stat-card reject">
                <div className="stat-number">{stats.reject}</div>
                <div className="stat-label">Reject</div>
              </div>
              {selectedIds.size > 0 && (
                <div
                  className="stat-card selection"
                  style={{
                    backgroundColor: "#667eea",
                    color: "white",
                  }}
                >
                  <div className="stat-number">{selectedIds.size}</div>
                  <div className="stat-label">Selected</div>
                </div>
              )}
            </div>

            {selectedIds.size > 0 && (
              <div
                style={{
                  backgroundColor: "#f0f7ff",
                  border: "2px solid #667eea",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <span style={{ fontWeight: 500 }}>
                  {selectedIds.size} candidate
                  {selectedIds.size !== 1 ? "s" : ""} selected
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => handleBulkAction("shortlist")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#388e3c")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#4caf50")
                    }
                  >
                    ✓ Shortlist
                  </button>
                  <button
                    onClick={() => handleBulkAction("interview")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#1976d2")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#2196f3")
                    }
                  >
                    📋 Interview
                  </button>
                  <button
                    onClick={() => handleBulkAction("reject")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#d32f2f",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#b71c1c")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#d32f2f")
                    }
                  >
                    ✕ Reject
                  </button>
                  <button
                    onClick={() => setSelectedIds(new Set())}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#999",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#666")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#999")
                    }
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            <SearchFilter candidates={candidates} onFilter={handleFilter} />
          </>
        )}

        <CandidateTable
          data={enrichedCandidates}
          selectedIds={selectedIds}
          onSelectCandidate={handleSelectCandidate}
          onSelectAll={handleSelectAll}
          onStatusChange={handleStatusChange}
        />
      </main>

      <footer className="app-footer">
        <p>
          💡 Tip: Click checkboxes to manually select candidates, use bulk
          actions above, or click a row for detailed view.
        </p>
      </footer>
    </div>
  );
}
