import Papa from "papaparse";

/**
 * Parse a CSV file and return an array of candidate objects
 * Expects the CSV to have columns like: Name, City, GitHub, Availability, Degree, etc.
 * @param {File} file - The CSV file to parse
 * @returns {Promise<Array>} Array of candidate objects with parsed data
 */
export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Trim all values and keys
        const candidates = results.data.map((row) => {
          const normalized = {};
          Object.entries(row).forEach(([key, value]) => {
            normalized[key.trim()] = value ? value.toString().trim() : "";
          });
          return normalized;
        });
        resolve(candidates);
      },
      error: reject,
    });
  });
}

/**
 * Extract and normalize candidate fields from parsed data
 * @param {Array} candidates - Array of candidate objects
 * @returns {Array} Candidates with standardized fields
 */
export function extractCandidateFields(candidates) {
  return candidates.map((candidate) => {
    // Parse skill ratings (0-3 scale)
    const getSkillScore = (fieldName) => {
      const value = candidate[fieldName] || "0";
      return Math.min(parseInt(value) || 0, 3);
    };

    // Parse GPA (handle both "value" and "value/max" formats)
    const parseGPA = (value) => {
      if (!value) return null;
      const num = parseFloat(value.split("/")[0]);
      return isNaN(num) ? null : num;
    };

    return {
      name: candidate["Candidate Name"] || candidate["Name"] || "",
      city: candidate["City"] || candidate["Location"] || "",
      github: candidate["GitHub"] || candidate["GitHub Profile"] || "",
      availability: candidate["Availability"] || candidate["Available"] || "",
      degree: candidate["Degree"] || candidate["Education"] || "",
      institute: candidate["Institute"] || "",
      stream: candidate["Stream"] || "",
      gradYear: candidate["Graduation Year"] || "",

      // Skill ratings (0-3)
      skills: {
        javascript: getSkillScore("JavaScript"),
        react: getSkillScore("React"),
        html: getSkillScore("HTML"),
        css: getSkillScore("CSS"),
        coordination: getSkillScore("Coordination"),
        englishSpoken: getSkillScore("English Speaking"),
        englishWritten: getSkillScore("English Writing"),
        communication: getSkillScore("Communication"),
      },

      // Performance metrics
      gpaUG: parseGPA(candidate["GPA_UG"] || candidate["Performance_UG"] || ""),
      gpaPG: parseGPA(candidate["GPA_PG"] || candidate["Performance_PG"] || ""),
      gpa12: parseGPA(candidate["GPA_12"] || candidate["Performance_12"] || ""),
      gpa10: parseGPA(candidate["GPA_10"] || candidate["Performance_10"] || ""),

      // Raw data for reference
      rawData: candidate,
    };
  });
}
