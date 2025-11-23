import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { calculateRepoStats } from '../src/core/stats';
import type { GitHubRepo } from '../src/types/github';

const FIXED_NOW = new Date('2025-11-25T00:00:00Z');

const mockRepos: GitHubRepo[] = [
  {
    name: 'repo-a',
    full_name: 'ischar/repo-a',
    description: null,
    stargazers_count: 5,
    forks_count: 2,
    watchers_count: 0,
    language: 'TypeScript',
    updated_at: '2025-11-22T10:00:00Z', 
    fork: false,
  },
  {
    name: 'repo-b',
    full_name: 'ischar/repo-b',
    description: null,
    stargazers_count: 3,
    forks_count: 0,
    watchers_count: 0,
    language: 'JavaScript',
    updated_at: '2025-11-20T02:00:00Z', 
    fork: false,
  },
  {
    name: 'repo-c',
    full_name: 'ischar/repo-c',
    description: null,
    stargazers_count: 2,
    forks_count: 1,
    watchers_count: 0,
    language: null,
    updated_at: '2025-10-01T08:00:00Z', 
    fork: false,
  },
];

describe('calculateRepoStats', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('computes total repos, stars, and forks', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.totalRepos).toBe(3);
    expect(stats.totalStars).toBe(10);
    expect(stats.totalForks).toBe(3);
  });

  it('aggregates languages correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.languages.TypeScript).toBe(1);
    expect(stats.languages.JavaScript).toBe(1);
    expect(stats.languages.Unknown).toBe(1);
  });

  it('computes language percentages correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.languagePercentages.TypeScript).toBeCloseTo(33.33, 1);
    expect(stats.languagePercentages.JavaScript).toBeCloseTo(33.33, 1);
    expect(stats.languagePercentages.Unknown).toBeCloseTo(33.33, 1);
  });

  it('computes repository activity correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.activity.last30Days).toBe(2);
    expect(stats.activity.last90Days).toBe(3);
  });

  it('sorts top starred correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.topStarred[0].name).toBe('repo-a');
    expect(stats.topStarred[0].stars).toBe(5);
  });

  it('sorts top forked correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.topForked[0].name).toBe('repo-a');
    expect(stats.topForked[0].forks).toBe(2);
  });

  it('sorts recently updated correctly', () => {
    const stats = calculateRepoStats(mockRepos);

    expect(stats.recentlyUpdated[0].name).toBe('repo-a');
    expect(stats.recentlyUpdated[1].name).toBe('repo-b');
    expect(stats.recentlyUpdated[2].name).toBe('repo-c');
  });
});
