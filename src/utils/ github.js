const GITHUB_REGEX =
  /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)?\/?$/;

export function normalizeGitHubUrl(raw = "") {
  if (!raw) return "";
  const trimmed = raw.trim();

  if (trimmed.startsWith("github.com/")) {
    return "https://" + trimmed;
  }
  if (!trimmed.startsWith("http") && trimmed.includes("github.com")) {
    return "https://" + trimmed;
  }
  return trimmed;
}

export function isValidGitHubUrl(url = "") {
  return GITHUB_REGEX.test(url);
}

export function getGitHubType(url = "") {
  if (!url.includes("github.com")) return null;
  const parts = url.replace("https://github.com/", "").split("/");
  return parts.length >= 2 ? "repo" : "profile";
}
