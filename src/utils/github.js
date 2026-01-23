/**
 * Normalize a GitHub URL by adding https:// if missing
 * @param {string} url - The GitHub URL to normalize
 * @returns {string} Normalized URL or empty string if invalid
 */
export function normalizeGitHubURL(url) {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  // If it already has a protocol, return as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // If it starts with github.com, add https://
  if (trimmed.startsWith("github.com")) {
    return `https://${trimmed}`;
  }

  // If it looks like a GitHub URL without protocol
  if (trimmed.startsWith("www.github.com") || trimmed.includes("github.com")) {
    return `https://${trimmed.replace(/^www\./, "")}`;
  }

  // If it looks like just a username, add the GitHub profile URL
  if (/^[a-zA-Z0-9-]+$/.test(trimmed) && !trimmed.includes("/")) {
    return `https://github.com/${trimmed}`;
  }

  return trimmed;
}

/**
 * Validate if a URL is a valid GitHub URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid GitHub URL
 */
export function isValidGitHubURL(url) {
  if (!url || typeof url !== "string") return false;

  const githubURLRegex =
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?[a-zA-Z0-9._/-]*$/;
  return githubURLRegex.test(url);
}

/**
 * Detect if a GitHub URL is a profile or a repository
 * @param {string} url - The GitHub URL to check
 * @returns {string} 'profile', 'repo', or 'invalid'
 */
export function detectGitHubType(url) {
  if (!url || typeof url !== "string") return "invalid";

  const trimmed = url.trim();
  if (!trimmed) return "invalid";

  // Check if it's a valid GitHub URL first
  if (!isValidGitHubURL(trimmed)) {
    return "invalid";
  }

  // Remove protocol and www
  const cleaned = trimmed
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  // Split by / to get parts
  const parts = cleaned.split("/");

  // github.com/username = profile
  // github.com/username/ = profile
  if (parts.length === 2 && parts[0] === "github.com") {
    return "profile";
  }

  // github.com/username/repo = repository
  // github.com/username/repo/ = repository
  if (parts.length >= 3 && parts[0] === "github.com") {
    return "repo";
  }

  return "invalid";
}

/**
 * Get GitHub status for a URL
 * @param {string} url - The GitHub URL to check
 * @returns {object} { status: 'valid-profile' | 'valid-repo' | 'invalid', url: string }
 */
export function getGitHubStatus(url) {
  const normalized = normalizeGitHubURL(url);

  if (!normalized) {
    return {
      status: "invalid",
      url: "",
    };
  }

  const type = detectGitHubType(normalized);

  if (type === "invalid") {
    return {
      status: "invalid",
      url: normalized,
    };
  }

  return {
    status: type === "profile" ? "valid-profile" : "valid-repo",
    url: normalized,
  };
}
