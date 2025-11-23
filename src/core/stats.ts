// src/stats.ts
import type { GitHubRepo } from '../types/github';
import type { RepoStats } from '../types/repoStats';

const TOP_N = 5;

export function calculateRepoStats(repos: GitHubRepo[]): RepoStats {
  const totalRepos = repos.length;

  let totalStars = 0;
  let totalForks = 0;

  const languages: Record<string, number> = {};

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    const lang = repo.language ?? 'Unknown';
    languages[lang] = (languages[lang] || 0) + 1;
  }

  const languagePercentages: Record<string, number> = {};
  for (const [lang, count] of Object.entries(languages)) {
    languagePercentages[lang] = Number(((count / totalRepos) * 100).toFixed(2));
  }

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  let last30Days = 0;
  let last90Days = 0;

  for (const repo of repos) {
    const updated = new Date(repo.updated_at).getTime();
    const diff = now - updated;

    if (diff <= 30 * DAY) last30Days++;
    if (diff <= 90 * DAY) last90Days++;
  }

  const activity = { last30Days, last90Days };

  const filteredRepos = repos.filter((r) => !r.fork);

  const topStarred = [...filteredRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, TOP_N)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  const topForked = [...filteredRepos]
    .sort((a, b) => b.forks_count - a.forks_count)
    .slice(0, TOP_N)
    .map((repo) => ({
      name: repo.name,
      forks: repo.forks_count,
    }));

  const recentlyUpdated = [...filteredRepos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, TOP_N)
    .map((repo) => ({
      name: repo.name,
      updated_at: repo.updated_at,
    }));

  return {
    totalRepos,
    totalStars,
    totalForks,
    languages,
    languagePercentages,
    activity,
    topStarred,
    topForked,
    recentlyUpdated,
  };
}
