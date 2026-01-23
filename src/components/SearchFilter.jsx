import React, { useState, useEffect } from "react";

export default function SearchFilter({ candidates, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandFilters, setExpandFilters] = useState(window.innerWidth >= 768);
  const [filters, setFilters] = useState({
    verdict: "all",
    minScore: 0,
    maxScore: 25,
    city: "all",
    availability: "all",
  });

  useEffect(() => {
    const handleResize = () => {
      setExpandFilters(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get unique values for filters
  const cities = [
    ...new Set(candidates.map((c) => c.city).filter(Boolean)),
  ].sort();
  const availabilities = [
    ...new Set(candidates.map((c) => c.availability).filter(Boolean)),
  ].sort();

  // Apply filters
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.institute.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVerdict =
      filters.verdict === "all" || candidate.verdict === filters.verdict;

    const matchesScore =
      candidate.score >= filters.minScore &&
      candidate.score <= filters.maxScore;

    const matchesCity =
      filters.city === "all" || candidate.city === filters.city;

    const matchesAvailability =
      filters.availability === "all" ||
      candidate.availability === filters.availability;

    return (
      matchesSearch &&
      matchesVerdict &&
      matchesScore &&
      matchesCity &&
      matchesAvailability
    );
  });

  React.useEffect(() => {
    onFilter(filteredCandidates);
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      verdict: "all",
      minScore: 0,
      maxScore: 25,
      city: "all",
      availability: "all",
    });
  };

  return (
    <div className="filter-container">
      {/* Search Bar */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="🔍 Search by name or institute..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontFamily: "inherit",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#667eea")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      {/* Mobile: Collapsible Filters */}
      {!expandFilters && (
        <button
          onClick={() => setExpandFilters(!expandFilters)}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "1rem",
            fontSize: "0.95rem",
          }}
        >
          {expandFilters ? "▼ Hide Filters" : "▶ Show Filters"}
        </button>
      )}

      {/* Filters Grid */}
      {expandFilters && (
        <>
          <div className="filter-grid">
            {/* Verdict Filter */}
            <div className="filter-group">
              <label>Verdict</label>
              <select
                value={filters.verdict}
                onChange={(e) =>
                  setFilters({ ...filters, verdict: e.target.value })
                }
              >
                <option value="all">All Verdicts</option>
                <option value="Strong Interview">Strong Interview</option>
                <option value="Interview">Interview</option>
                <option value="Screen Further">Screen Further</option>
                <option value="Maybe">Maybe</option>
                <option value="Reject">Reject</option>
              </select>
            </div>

            {/* Score Range */}
            <div className="filter-group">
              <label>Min Score: {filters.minScore}</label>
              <input
                type="range"
                min="0"
                max="25"
                value={filters.minScore}
                onChange={(e) =>
                  setFilters({ ...filters, minScore: parseInt(e.target.value) })
                }
              />
            </div>

            {/* Max Score */}
            <div className="filter-group">
              <label>Max Score: {filters.maxScore}</label>
              <input
                type="range"
                min="0"
                max="25"
                value={filters.maxScore}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxScore: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* City Filter */}
            <div className="filter-group">
              <label>City</label>
              <select
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="filter-group">
              <label>Availability</label>
              <select
                value={filters.availability}
                onChange={(e) =>
                  setFilters({ ...filters, availability: e.target.value })
                }
              >
                <option value="all">All Availability</option>
                {availabilities.map((av) => (
                  <option key={av} value={av}>
                    {av}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              color: "#666",
              padding: "0.75rem",
              background: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            📊 Showing <strong>{filteredCandidates.length}</strong> of{" "}
            <strong>{candidates.length}</strong> candidates
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1rem",
              background: "#f5f5f5",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "background 0.2s",
              width: "100%",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
            onMouseOut={(e) => (e.target.style.background = "#f5f5f5")}
          >
            🔄 Clear All Filters
          </button>
        </>
      )}
    </div>
  );
}
