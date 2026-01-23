import {
  normalizeGitHubURL,
  isValidGitHubURL,
  detectGitHubType,
} from "./github.js";

/**
 * Enhanced scoring based on skills, experience, and profile
 * @param {object} candidate - Candidate object with fields and skills
 * @returns {object} Candidate with detailed score breakdown
 */
export function scoreCandidate(candidate) {
  const breakdown = {};
  let score = 0;

  // 1. GitHub Profile (0-2 points)
  const githubURL = normalizeGitHubURL(candidate.github || "");
  const isValidGitHub = isValidGitHubURL(githubURL);

  if (isValidGitHub) {
    breakdown.github = 1;
    score += 1;

    const githubType = detectGitHubType(githubURL);
    if (githubType === "repo") {
      breakdown.githubRepo = 1;
      score += 1;
    }
  } else {
    breakdown.github = 0;
  }

  // 2. Technical Skills (0-10 points)
  const skills = candidate.skills || {};
  const techSkillsScore = Math.min(
    (skills.javascript || 0) +
      (skills.react || 0) +
      (skills.html || 0) +
      (skills.css || 0),
    10,
  );
  breakdown.technicalSkills = techSkillsScore;
  score += techSkillsScore;

  // 3. React Expertise (0-3 points)
  const reactScore = Math.min((skills.react || 0) * 1.5, 3);
  breakdown.reactExpertise = Math.round(reactScore * 10) / 10;
  score += breakdown.reactExpertise;

  // 4. Soft Skills (0-5 points)
  const softSkillsScore = Math.min(
    (skills.englishSpoken || 0) +
      (skills.englishWritten || 0) +
      (skills.communication || 0) +
      (skills.coordination || 0),
    5,
  );
  breakdown.softSkills = softSkillsScore;
  score += softSkillsScore;

  // 5. Academic Performance (0-3 points)
  let academicScore = 0;
  const gpa =
    candidate.gpaPG || candidate.gpaUG || candidate.gpa12 || candidate.gpa10;
  if (gpa) {
    if (gpa >= 9) academicScore = 3;
    else if (gpa >= 8) academicScore = 2.5;
    else if (gpa >= 7) academicScore = 2;
    else if (gpa >= 6) academicScore = 1;
  }
  breakdown.academic = academicScore;
  score += academicScore;

  // 6. Availability (0-1 point)
  const availability = (candidate.availability || "").toLowerCase();
  const immediateAvailable =
    availability.includes("immediately") ||
    availability.includes("available") ||
    availability.includes("yes");
  breakdown.availability = immediateAvailable ? 1 : 0;
  score += breakdown.availability;

  // 7. Location (0-1 point)
  const city = (candidate.city || "").toLowerCase();
  const isBangalore = city.includes("bangalore") || city.includes("bengaluru");
  breakdown.location = isBangalore ? 1 : 0;
  score += breakdown.location;

  // 8. Degree Relevance (0-1 point)
  const degree = (candidate.degree || "").toLowerCase();
  const relevantDegree = degree.match(/computer|cse|it|mca|engineering|bca/);
  breakdown.degreeRelevance = relevantDegree ? 1 : 0;
  score += breakdown.degreeRelevance;

  // Final verdict based on total score (out of ~25)
  let verdict = "Reject";
  let color = "red";
  if (score >= 18) {
    verdict = "Strong Interview";
    color = "green";
  } else if (score >= 14) {
    verdict = "Interview";
    color = "lightgreen";
  } else if (score >= 10) {
    verdict = "Screen Further";
    color = "orange";
  } else if (score >= 6) {
    verdict = "Maybe";
    color = "yellow";
  }

  return {
    ...candidate,
    score: Math.round(score * 10) / 10,
    maxScore: 25,
    verdict,
    color,
    breakdown,
    githubStatus: isValidGitHub
      ? detectGitHubType(githubURL) === "profile"
        ? "valid-profile"
        : "valid-repo"
      : "invalid",
  };
}

/**
 * Batch score multiple candidates
 * @param {Array} candidates - Array of candidate objects
 * @returns {Array} Scored candidates sorted by score
 */
export function scoreCandidates(candidates) {
  return candidates
    .map((candidate) => scoreCandidate(candidate))
    .sort((a, b) => b.score - a.score);
}
