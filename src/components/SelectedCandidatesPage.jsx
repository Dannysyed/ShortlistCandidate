import React, { useState } from "react";
import CandidateTable from "./CandidateTable";
import { exportCandidatesToCSV } from "../utils/exportCSV.js";

export default function SelectedCandidatesPage({
  candidates,
  selectedIds,
  selectedStatus,
  onBack,
  onStatusChange,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "score",
    direction: "desc",
  });

  // Get selected candidates with their custom statuses
  const selectedCandidates = candidates
    .filter((c) => selectedIds.has(c.id))
    .map((c) => ({
      ...c,
      customStatus: selectedStatus[c.id] || null,
    }));

  // Stats for selected candidates
  const stats = {
    shortlist: selectedCandidates.filter((c) => c.customStatus === "shortlist")
      .length,
    interview: selectedCandidates.filter((c) => c.customStatus === "interview")
      .length,
    reject: selectedCandidates.filter((c) => c.customStatus === "reject")
      .length,
    unassigned: selectedCandidates.filter((c) => !c.customStatus).length,
  };

  const handleExport = (filterType) => {
    let toExport = selectedCandidates;

    if (filterType === "shortlist") {
      toExport = selectedCandidates.filter(
        (c) => c.customStatus === "shortlist",
      );
    } else if (filterType === "interview") {
      toExport = selectedCandidates.filter(
        (c) => c.customStatus === "interview",
      );
    } else if (filterType === "reject") {
      toExport = selectedCandidates.filter((c) => c.customStatus === "reject");
    } else if (filterType === "unassigned") {
      toExport = selectedCandidates.filter((c) => !c.customStatus);
    }

    if (toExport.length === 0) {
      alert(`No ${filterType} candidates to export`);
      return;
    }

    exportCandidatesToCSV(toExport);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 5px 0" }}>
            📋 Selected Candidates ({selectedCandidates.length})
          </h2>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            Manage and export your selected candidates
          </p>
        </div>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5568d3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#667eea")}
        >
          ← Back to Main
        </button>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            textAlign: "center",
            borderLeft: "4px solid #4caf50",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#2e7d32",
            }}
          >
            {stats.shortlist}
          </div>
          <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
            Shortlist
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            textAlign: "center",
            borderLeft: "4px solid #2196f3",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1565c0",
            }}
          >
            {stats.interview}
          </div>
          <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
            Interview
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            textAlign: "center",
            borderLeft: "4px solid #d32f2f",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#c62828",
            }}
          >
            {stats.reject}
          </div>
          <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
            Reject
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3e0",
            borderRadius: "8px",
            textAlign: "center",
            borderLeft: "4px solid #ff9800",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#e65100",
            }}
          >
            {stats.unassigned}
          </div>
          <div style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
            Unassigned
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div
        style={{
          backgroundColor: "#f0f7ff",
          border: "2px solid #667eea",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ margin: "0 0 15px 0" }}>📥 Export Options</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => handleExport("all")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5568d3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#667eea")}
          >
            📊 Export All Selected ({selectedCandidates.length})
          </button>

          <button
            onClick={() => handleExport("shortlist")}
            disabled={stats.shortlist === 0}
            style={{
              padding: "10px 20px",
              backgroundColor: stats.shortlist > 0 ? "#4caf50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: stats.shortlist > 0 ? "pointer" : "not-allowed",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              stats.shortlist > 0 &&
              (e.target.style.backgroundColor = "#388e3c")
            }
            onMouseOut={(e) =>
              stats.shortlist > 0 &&
              (e.target.style.backgroundColor = "#4caf50")
            }
          >
            ✓ Export Shortlist ({stats.shortlist})
          </button>

          <button
            onClick={() => handleExport("interview")}
            disabled={stats.interview === 0}
            style={{
              padding: "10px 20px",
              backgroundColor: stats.interview > 0 ? "#2196f3" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: stats.interview > 0 ? "pointer" : "not-allowed",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              stats.interview > 0 &&
              (e.target.style.backgroundColor = "#1976d2")
            }
            onMouseOut={(e) =>
              stats.interview > 0 &&
              (e.target.style.backgroundColor = "#2196f3")
            }
          >
            📋 Export Interview ({stats.interview})
          </button>

          <button
            onClick={() => handleExport("reject")}
            disabled={stats.reject === 0}
            style={{
              padding: "10px 20px",
              backgroundColor: stats.reject > 0 ? "#d32f2f" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: stats.reject > 0 ? "pointer" : "not-allowed",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              stats.reject > 0 && (e.target.style.backgroundColor = "#b71c1c")
            }
            onMouseOut={(e) =>
              stats.reject > 0 && (e.target.style.backgroundColor = "#d32f2f")
            }
          >
            ✕ Export Reject ({stats.reject})
          </button>
        </div>
      </div>

      {/* Table */}
      {selectedCandidates.length > 0 ? (
        <>
          <h3 style={{ marginBottom: "15px" }}>Selected Candidates Table</h3>
          <CandidateTable
            data={selectedCandidates}
            selectedIds={new Set()}
            onSelectCandidate={() => {}}
            onSelectAll={() => {}}
            onStatusChange={onStatusChange}
          />
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>📭</div>
          <h3>No Selected Candidates</h3>
          <p>Go back and select candidates to see them here</p>
        </div>
      )}
    </div>
  );
}
