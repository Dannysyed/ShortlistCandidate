import React, { useState } from "react";

export default function SearchFilter({ candidates, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    verdict: "all",
    minScore: 0,
    maxScore: 25,
    city: "all",
    availability: "all",
  });

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

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name or institute..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 6,
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Filters Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {/* Verdict Filter */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#666",
              marginBottom: 6,
            }}
          >
            Verdict
          </label>
          <select
            value={filters.verdict}
            onChange={(e) =>
              setFilters({ ...filters, verdict: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "inherit",
            }}
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
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#666",
              marginBottom: 6,
            }}
          >
            Min Score: {filters.minScore}
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={filters.minScore}
            onChange={(e) =>
              setFilters({ ...filters, minScore: parseInt(e.target.value) })
            }
            style={{ width: "100%" }}
          />
        </div>

        {/* City Filter */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#666",
              marginBottom: 6,
            }}
          >
            City
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "inherit",
            }}
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
        <div>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#666",
              marginBottom: 6,
            }}
          >
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) =>
              setFilters({ ...filters, availability: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            <option value="all">All</option>
            {availabilities.map((av) => (
              <option key={av} value={av}>
                {av}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
        Showing {filteredCandidates.length} of {candidates.length} candidates
      </div>
    </div>
  );
}
