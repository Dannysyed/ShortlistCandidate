import { parseCSV, extractCandidateFields } from "../utils/csvParser.js";
import { scoreCandidates } from "../utils/scorer.js";
import { exportCandidatesToCSV } from "../utils/exportCSV.js";
import { useState } from "react";

export default function FileUpload({ onData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCandidates, setCurrentCandidates] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      // Parse CSV
      const rawData = await parseCSV(file);

      // Extract standard candidate fields
      const candidates = extractCandidateFields(rawData);

      // Score candidates
      const scoredCandidates = scoreCandidates(candidates);

      setCurrentCandidates(scoredCandidates);

      // Pass data to parent
      onData(scoredCandidates);
    } catch (err) {
      setError(`Error parsing CSV: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label htmlFor="csv-upload" style={{ fontWeight: "bold" }}>
            Upload Internshala CSV:
          </label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFile}
            disabled={loading}
            style={{ marginLeft: 10 }}
          />
          {loading && (
            <span style={{ marginLeft: 10, color: "#666" }}>Processing...</span>
          )}
        </div>
        {currentCandidates.length > 0 && (
          <button
            onClick={() => exportCandidatesToCSV(currentCandidates)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          >
            📥 Export Results
          </button>
        )}
      </div>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </div>
  );
}
