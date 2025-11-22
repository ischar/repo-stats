import 'dotenv/config';
import { describe, it, expect } from 'vitest';
import { fetchUserRepos } from '../src/github/fetcher';

const usernameEnv = process.env.GITHUB_USERNAME;
if (!usernameEnv) {
  throw new Error('GITHUB_USERNAME is not set in .env');
}
const username: string = usernameEnv;

describe('fetchUserRepos', () => {
  it('should fetch repos for a valid user', async () => {
    const repos = await fetchUserRepos(username);

    expect(Array.isArray(repos)).toBe(true);
    expect(repos.length).toBeGreaterThan(0);
    expect(repos[0]).toHaveProperty('name');
  });
});
