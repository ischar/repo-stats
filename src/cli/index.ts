import 'dotenv/config';
import { fetchUserRepos } from '../github/fetcher';
import { calculateRepoStats } from '../core/stats';
import { formatRepoStats } from './formatter';

async function main() {
  const [, , argUsername] = process.argv;
  const usernameEnv = process.env.GITHUB_USERNAME;
  const username = argUsername || usernameEnv;

  if (!username) {
    console.error('Error: GitHub username is required.');
    console.error('');
    console.error('Usage:');
    console.error('  repo-stats <username>');
    console.error('');
    console.error('Or set GITHUB_USERNAME in your .env file and run:');
    console.error('  repo-stats');
    process.exit(1);
  }

  try {
    const repos = await fetchUserRepos(username);
    const stats = calculateRepoStats(repos);
    const output = formatRepoStats(username, stats);

    console.log(output);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch repositories: ${error.message}`);
    } else {
      console.error('Failed to fetch repositories due to an unknown error.');
    }
    process.exit(1);
  }
}

main();
