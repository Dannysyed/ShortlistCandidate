import { useState } from "react";
import FileUpload from "./components/FileUpload";
import CandidateTable from "./components/CandidateTable";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleData = (scoredCandidates) => {
    // Data comes already scored from FileUpload component
    setCandidates(scoredCandidates);
    setFilteredCandidates(scoredCandidates);
  };

  const handleFilter = (filtered) => {
    setFilteredCandidates(filtered);
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Intern Shortlisting Tool</h1>
        <p>Upload Internshala CSV and auto-shortlist candidates</p>
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
            </div>

            <SearchFilter candidates={candidates} onFilter={handleFilter} />
          </>
        )}

        <CandidateTable data={filteredCandidates} />
      </main>

      <footer className="app-footer">
        <p>
          Enhanced scoring: GitHub (+0-2) | Technical Skills (+0-10) | React
          Expertise (+0-3) | Soft Skills (+0-5) | Academic (+0-3) | Availability
          (+0-1) | Location (+0-1) | Degree (+0-1) = 0-25 Total
        </p>
      </footer>
    </div>
  );
}
