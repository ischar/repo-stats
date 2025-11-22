import axios from 'axios';
import type { GitHubUserReposResponse, GitHubError } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

function buildHeaders() {
  const headers: Record<string, string> = {
    'User-Agent': 'repo-stats-cli',
    Accept: 'application/vnd.github*json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function fetchUserRepos(username: string): Promise<GitHubUserReposResponse> {
  if (!username) {
    throw new Error('GitHub username is required');
  }

  const url = `${GITHUB_API_BASE}/users/${username}/repos`;

  try {
    const response = await axios.get<GitHubUserReposResponse>(url, {
      headers: buildHeaders(),
      params: {
        per_page: 100,
        sort: 'updated',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as GitHubError;
      const status = error.response.status;
      const message = data?.message ?? 'Unknown GitHub API error';

      if (status === 404) {
        throw new Error(`GitHub user "${username}" not found`);
      }

      throw new Error(`GitHub API error (${status}): ${message}`);
    }

    throw new Error(`Failed to fetch GitHub repositories`);
  }
}
