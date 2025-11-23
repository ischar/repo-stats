export interface RepoStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;

  languages: Record<string, number>;

  languagePercentages: Record<string, number>;

  topStarred: Array<{
    name: string;
    stars: number;
  }>;

  topForked: Array<{
    name: string;
    forks: number;
  }>;

  recentlyUpdated: Array<{
    name: string;
    updated_at: string;
  }>;

  activity: {
    last30Days: number;
    last90Days: number;
  };
}
