import { parseCSV, extractCandidateFields } from "../utils/csvParser.js";
import { scoreCandidates } from "../utils/scorer.js";
import { exportCandidatesToCSV } from "../utils/exportCSV.js";
import { useState } from "react";

export default function FileUpload({ onData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentCandidates, setCurrentCandidates] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Parse CSV
      const rawData = await parseCSV(file);

      if (!rawData || rawData.length === 0) {
        setError("CSV file is empty or invalid");
        return;
      }

      // Extract standard candidate fields
      const candidates = extractCandidateFields(rawData);

      // Score candidates
      const scoredCandidates = scoreCandidates(candidates);

      setCurrentCandidates(scoredCandidates);
      setSuccess(`Successfully loaded ${scoredCandidates.length} candidates`);

      // Pass data to parent
      onData(scoredCandidates);

      // Reset file input
      e.target.value = "";
    } catch (err) {
      setError(`Error parsing CSV: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-input-group">
        <label htmlFor="csv-upload">📁 Upload CSV:</label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFile}
          disabled={loading}
          title="Select a CSV file with candidate data"
        />
        {loading && <span>⏳ Processing...</span>}
      </div>
      {currentCandidates.length > 0 && (
        <button
          onClick={() => exportCandidatesToCSV(currentCandidates)}
          className="export-button"
          title="Download results as CSV for sharing with team"
        >
          📥 Export Results
        </button>
      )}

      {error && (
        <div
          style={{
            width: "100%",
            padding: "0.8rem",
            background: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            fontSize: "0.9rem",
            borderLeft: "4px solid #c62828",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div
          style={{
            width: "100%",
            padding: "0.8rem",
            background: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: "4px",
            fontSize: "0.9rem",
            borderLeft: "4px solid #2e7d32",
          }}
        >
          ✓ {success}
        </div>
      )}
    </div>
  );
}
