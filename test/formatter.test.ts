import { describe, it, expect } from 'vitest';
import { formatRepoStats } from '../src/cli/formatter';
import type { RepoStats } from '../src/types/repoStats';

const mockStats: RepoStats = {
  totalRepos: 3,
  totalStars: 10,
  totalForks: 4,
  languages: {
    TypeScript: 1,
    JavaScript: 1,
    Unknown: 1,
  },
  topStarred: [
    { name: 'repo-a', stars: 5 },
    { name: 'repo-b', stars: 3 },
    { name: 'repo-c', stars: 2 },
  ],
  topForked: [
    { name: 'repo-a', forks: 2 },
    { name: 'repo-c', forks: 1 },
    { name: 'repo-b', forks: 1 },
  ],
  recentlyUpdated: [
    { name: 'repo-a', updated_at: '2025-11-22T10:00:00Z' },
    { name: 'repo-b', updated_at: '2025-11-20T02:00:00Z' },
    { name: 'repo-c', updated_at: '2025-11-19T08:00:00Z' },
  ],
};

describe('formatRepoStats', () => {
  const username = 'ischar';
  const output = formatRepoStats(username, mockStats);

  it('includes header with username', () => {
    expect(output).toContain(`📊 Repo stats for @${username}`);
  });

  it('includes summary section', () => {
    expect(output).toContain('📌 Summary');
    expect(output).toContain('Repositories');
    expect(output).toContain('Stars');
    expect(output).toContain('Forks');
  });

  it('includes languages section', () => {
    expect(output).toContain('📝 Languages');
    expect(output).toContain('TypeScript');
    expect(output).toContain('JavaScript');
    expect(output).toContain('Unknown');
  });

  it('includes top starred section', () => {
    expect(output).toContain('⭐ Top starred repositories');
    expect(output).toContain('repo-a');
    expect(output).toContain('(5★)');
  });

  it('includes top forked section', () => {
    expect(output).toContain('🍴 Top forked repositories');
    expect(output).toContain('repo-a');
    expect(output).toContain('(2 forks)');
  });

  it('includes recently updated section', () => {
    expect(output).toContain('⏱  Recently updated');
    expect(output).toContain('repo-a');
    expect(output).toContain('2025-11-22T10:00:00Z');
  });
});
