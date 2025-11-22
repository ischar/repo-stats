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

  const topStarred = [...repos]
    .filter((r) => !r.fork) 
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, TOP_N)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  const topForked = [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => b.forks_count - a.forks_count)
    .slice(0, TOP_N)
    .map((repo) => ({
      name: repo.name,
      forks: repo.forks_count,
    }));

  const recentlyUpdated = [...repos]
    .filter((r) => !r.fork)
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
    topStarred,
    topForked,
    recentlyUpdated,
  };
}
