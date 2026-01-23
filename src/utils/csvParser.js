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

    // Extract GitHub URL from messy text field
    const extractGitHubURL = (text) => {
      if (!text) return "";

      // Clean up the text (remove special characters, extra spaces)
      let cleaned = text
        .replace(/[§•*]/g, "") // Remove special characters
        .trim();

      // Look for GitHub URLs in various formats
      const githubRegex =
        /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9._-]+(?:\/[a-zA-Z0-9._-]+)*/gi;
      const matches = cleaned.match(githubRegex);

      if (matches && matches.length > 0) {
        let url = matches[0].trim();

        // Normalize the URL (add https:// if missing)
        if (!url.startsWith("http")) {
          url = "https://" + url.replace(/^www\./, "");
        }

        return url;
      }

      return "";
    };

    return {
      name: candidate["Candidate Name"] || candidate["Name"] || "",
      city:
        candidate["Current City"] ||
        candidate["City"] ||
        candidate["Location"] ||
        "",
      github: extractGitHubURL(
        candidate["GitHub"] ||
          candidate["GitHub Profile"] ||
          candidate[
            "Q1. Please share your GitHub ID and one of your React projects."
          ] ||
          "",
      ),
      availability:
        candidate[
          "Please confirm your availability for this internship. If not available immediately, how early would you be able to join?"
        ] ||
        candidate["Availability"] ||
        candidate["Available"] ||
        "",
      degree: candidate["Degree"] || candidate["Education"] || "",
      phone: candidate["Phone"] || "",
      email: candidate["Email Address"] || "",
      resume:
        candidate["Resume"] ||
        candidate["Resume Link"] ||
        candidate["Resume URL"] ||
        candidate["Portfolio"] ||
        candidate["Portfolio Link"] ||
        candidate["Q3. Please share a link to your portfolio / CV."] ||
        candidate["CV Link"] ||
        "",
      institute: candidate["Institute"] || "",
      stream: candidate["Stream"] || "",
      gradYear:
        candidate["Current Year Of Graduation"] ||
        candidate["Graduation Year"] ||
        "",

      // Skill ratings (0-3)
      skills: {
        javascript: getSkillScore("JavaScript"),
        react: getSkillScore("React"),
        html: getSkillScore("HTML 5") || getSkillScore("HTML"),
        css: getSkillScore("CSS3") || getSkillScore("CSS"),
        coordination: getSkillScore("Coordination"),
        englishSpoken:
          getSkillScore("English Proficiency (Spoken)") ||
          getSkillScore("English Speaking"),
        englishWritten:
          getSkillScore("English Proficiency (Written)") ||
          getSkillScore("English Writing"),
        communication:
          getSkillScore("Effective Communication") ||
          getSkillScore("Communication"),
      },

      // Performance metrics
      gpaUG: parseGPA(candidate["Performance_UG"] || candidate["GPA_UG"] || ""),
      gpaPG: parseGPA(candidate["Performance_PG"] || candidate["GPA_PG"] || ""),
      gpa12: parseGPA(candidate["Performance_12"] || candidate["GPA_12"] || ""),
      gpa10: parseGPA(candidate["Performance_10"] || candidate["GPA_10"] || ""),

      // Raw data for reference
      rawData: candidate,
    };
  });
}
