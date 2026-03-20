/**
 * lib/github.js
 * ─────────────────────────────────────────────────────────
 * GitHub API helpers for the portfolio projects section.
 *
 * Selection logic:
 *   Only repositories that have the topic "portfolio" are shown.
 *   This lets you curate exactly which projects appear without
 *   touching the code — just add/remove the topic on GitHub.
 *
 * Caching:
 *   Uses Next.js ISR revalidation (1 hour by default).
 *   Change REVALIDATE_SECONDS to suit your preference.
 *
 * Environment variables required in .env.local:
 *   GITHUB_TOKEN    — Personal Access Token (public_repo scope)
 *   GITHUB_USERNAME — Your GitHub username
 * ─────────────────────────────────────────────────────────
 */

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "naman8586";
const REVALIDATE_SECONDS = 3600; // 1 hour ISR cache

// Only use the token if it looks like a real GitHub PAT (starts with "ghp_" and is > 10 chars)
// This prevents sending the placeholder value and getting a 401 from GitHub
const rawToken = process.env.GITHUB_TOKEN ?? "";
const GITHUB_TOKEN =
  rawToken.startsWith("ghp_") && rawToken.length > 15 ? rawToken : null;

/** Map of programming languages → GitHub's official hex colors */
export const LANGUAGE_COLORS = {
  JavaScript:  "#f1e05a",
  TypeScript:  "#3178c6",
  Python:      "#3572A5",
  Java:        "#b07219",
  "C++":       "#f34b7d",
  C:           "#555555",
  "C#":        "#178600",
  Go:          "#00ADD8",
  Rust:        "#dea584",
  Ruby:        "#701516",
  PHP:         "#4F5D95",
  Swift:       "#F05138",
  Kotlin:      "#A97BFF",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
  Shell:       "#89e051",
  Vue:         "#41b883",
  Svelte:      "#ff3e00",
  Dart:        "#00B4AB",
  Elixir:      "#6e4a7e",
};

/**
 * Fetches ALL repositories for the configured GitHub user,
 * then filters to only those tagged with the "portfolio" topic.
 *
 * @returns {Promise<Array>} Shaped project objects, sorted by most recently pushed.
 */
export async function getPortfolioProjects() {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    // Using the topics preview header for topic filtering support
    "X-GitHub-Api-Version": "2022-11-28",
    ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
  };

  // Fetch up to 100 repos (GitHub max per page).
  // If you have more than 100 repos, add pagination logic below.
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
    {
      headers,
      // Next.js ISR: Revalidate this fetch every REVALIDATE_SECONDS
      next: { revalidate: REVALIDATE_SECONDS },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(
      `GitHub API error ${res.status}: ${error}`
    );
  }

  /** @type {any[]} */
  const repos = await res.json();

  // Filter: only repos with the "portfolio" topic
  const portfolioRepos = repos.filter(
    (repo) =>
      Array.isArray(repo.topics) &&
      repo.topics.includes("portfolio") &&
      !repo.archived // Skip archived repos
  );

  // Shape the data — only expose what the UI needs
  return portfolioRepos.map((repo) => ({
    id:          repo.id,
    name:        repo.name,
    // Friendly display name: convert kebab-case to Title Case
    displayName: toTitleCase(repo.name),
    description: repo.description || null,
    githubUrl:   repo.html_url,
    // homepage is the "Website" field on GitHub — used for live demo links
    homepageUrl: repo.homepage || null,
    stars:       repo.stargazers_count,
    language:    repo.language || null,
    topics:      repo.topics || [],
    pushedAt:    repo.pushed_at,
  }));
}

/** Converts "my-cool-project" → "My Cool Project" */
function toTitleCase(str) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Returns a relative time string like "3 days ago", "2 months ago".
 * @param {string} dateStr — ISO date string from GitHub API
 */
export function timeAgo(dateStr) {
  const now  = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000); // seconds

  if (diff < 60)                         return "just now";
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}
