export const exportCandidatesToCSV = (candidates) => {
  if (!candidates || candidates.length === 0) {
    alert("No candidates to export");
    return;
  }

  // CSV Header
  const headers = [
    "Name",
    "City",
    "Institute",
    "Degree",
    "Stream",
    "Graduation Year",
    "GitHub",
    "JavaScript (0-3)",
    "React (0-3)",
    "HTML (0-3)",
    "CSS (0-3)",
    "English Speaking (0-3)",
    "English Writing (0-3)",
    "Communication (0-3)",
    "Coordination (0-3)",
    "GPA UG",
    "GPA PG",
    "Availability",
    "Score",
    "Max Score",
    "Verdict",
    "GitHub Points",
    "Technical Skills Points",
    "React Expertise Points",
    "Soft Skills Points",
    "Academic Points",
    "Availability Points",
    "Location Points",
    "Degree Points",
  ];

  // CSV Rows
  const rows = candidates.map((candidate) => {
    const breakdown = candidate.breakdown || {};
    return [
      escapeCSV(candidate.name || ""),
      escapeCSV(candidate.city || ""),
      escapeCSV(candidate.institute || ""),
      escapeCSV(candidate.degree || ""),
      escapeCSV(candidate.stream || ""),
      candidate.gradYear || "",
      escapeCSV(candidate.github || ""),
      candidate.skills?.javascript || 0,
      candidate.skills?.react || 0,
      candidate.skills?.html || 0,
      candidate.skills?.css || 0,
      candidate.skills?.englishSpoken || 0,
      candidate.skills?.englishWritten || 0,
      candidate.skills?.communication || 0,
      candidate.skills?.coordination || 0,
      candidate.gpaUG || "",
      candidate.gpaPG || "",
      escapeCSV(candidate.availability || ""),
      candidate.score.toFixed(2),
      candidate.maxScore,
      escapeCSV(candidate.verdict),
      (breakdown.github || 0).toFixed(2),
      (breakdown.technicalSkills || 0).toFixed(2),
      (breakdown.reactExpertise || 0).toFixed(2),
      (breakdown.softSkills || 0).toFixed(2),
      (breakdown.academic || 0).toFixed(2),
      (breakdown.availability || 0).toFixed(2),
      (breakdown.location || 0).toFixed(2),
      (breakdown.degreeRelevance || 0).toFixed(2),
    ];
  });

  // Build CSV content
  const csvContent =
    headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `shortlist-${new Date().getTime()}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const escapeCSV = (str) => {
  if (!str) return "";
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};
