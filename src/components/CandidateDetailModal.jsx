import React from "react";

export default function CandidateDetailModal({ candidate, onClose }) {
  if (!candidate) return null;

  const renderScore = (label, value, max = 3) => (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ color: "#666" }}>
          {value}/{max}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 8,
          backgroundColor: "#eee",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(value / max) * 100}%`,
            backgroundColor:
              value >= 2 ? "#4caf50" : value >= 1 ? "#ffc107" : "#f44336",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );

  const breakdown = candidate.breakdown || {};
  const skills = candidate.skills || {};

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 30,
          maxWidth: 700,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: 20,
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 8px 0" }}>{candidate.name}</h2>
            <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
              {candidate.institute} • {candidate.stream}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#999",
            }}
          >
            ×
          </button>
        </div>

        {/* Overall Score */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
            Overall Score
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#667eea",
              marginBottom: 8,
            }}
          >
            {candidate.score}/{candidate.maxScore}
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              backgroundColor: candidate.color,
              color: "white",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {candidate.verdict}
          </div>
        </div>

        {/* Basic Info */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: "#333" }}>
            Basic Information
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#999" }}>City</div>
              <div style={{ fontWeight: 500 }}>{candidate.city}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#999" }}>Graduation Year</div>
              <div style={{ fontWeight: 500 }}>
                {candidate.gradYear || "N/A"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#999" }}>Availability</div>
              <div style={{ fontWeight: 500 }}>
                {candidate.availability || "N/A"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#999" }}>GitHub</div>
              <div style={{ fontWeight: 500 }}>
                {candidate.github ? (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2196f3" }}
                  >
                    {candidate.githubStatus === "valid-profile"
                      ? "👤 Profile"
                      : "📦 Repository"}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: "#333" }}>
            Technical Skills
          </h3>
          {renderScore("JavaScript", skills.javascript || 0)}
          {renderScore("React", skills.react || 0)}
          {renderScore("HTML", skills.html || 0)}
          {renderScore("CSS", skills.css || 0)}
        </div>

        {/* Soft Skills */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: "#333" }}>
            Soft Skills
          </h3>
          {renderScore("English (Spoken)", skills.englishSpoken || 0)}
          {renderScore("English (Written)", skills.englishWritten || 0)}
          {renderScore("Communication", skills.communication || 0)}
          {renderScore("Coordination", skills.coordination || 0)}
        </div>

        {/* Academic Performance */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: "#333" }}>
            Academic Performance
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {candidate.gpaPG && (
              <div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  GPA (Post-Graduate)
                </div>
                <div
                  style={{ fontWeight: 500, fontSize: 18, color: "#4caf50" }}
                >
                  {candidate.gpaPG.toFixed(2)}
                </div>
              </div>
            )}
            {candidate.gpaUG && (
              <div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  GPA (Under-Graduate)
                </div>
                <div
                  style={{ fontWeight: 500, fontSize: 18, color: "#4caf50" }}
                >
                  {candidate.gpaUG.toFixed(2)}
                </div>
              </div>
            )}
            {candidate.gpa12 && (
              <div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  12th Grade GPA
                </div>
                <div
                  style={{ fontWeight: 500, fontSize: 18, color: "#4caf50" }}
                >
                  {candidate.gpa12.toFixed(2)}
                </div>
              </div>
            )}
            {candidate.gpa10 && (
              <div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  10th Grade GPA
                </div>
                <div
                  style={{ fontWeight: 500, fontSize: 18, color: "#4caf50" }}
                >
                  {candidate.gpa10.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Score Breakdown */}
        <div
          style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 12, color: "#333" }}>
            Score Breakdown
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div style={{ fontSize: 14 }}>
              <span>GitHub Profile:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.github || 0}
              </span>
            </div>
            {breakdown.githubRepo && (
              <div style={{ fontSize: 14 }}>
                <span>Repository:</span>
                <span
                  style={{
                    float: "right",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  +{breakdown.githubRepo}
                </span>
              </div>
            )}
            <div style={{ fontSize: 14 }}>
              <span>Technical Skills:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.technicalSkills || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>React Expertise:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.reactExpertise || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>Soft Skills:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.softSkills || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>Academic:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.academic || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>Availability:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.availability || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>Location:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.location || 0}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span>Degree:</span>
              <span
                style={{ float: "right", fontWeight: "bold", color: "#667eea" }}
              >
                +{breakdown.degreeRelevance || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
