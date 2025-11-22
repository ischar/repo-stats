export interface GitHubRepo {
    name: string;
    full_name: string;
    descriptoin: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string | null;
    updated_at: string;
    fork: boolean;
}

export interface GitHubLanguages {
    [language: string]: number;
}

export interface GitHubContributor {
    login: string;
    contributions: number;
}

export interface GitHubError {
    message: string;
    documentation_url?: string;
}

export type GitHubUserReposResponse = GitHubRepo[];
