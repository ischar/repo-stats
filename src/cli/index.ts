// src/cli/index.ts
import 'dotenv/config';
import { fetchUserRepos } from '../github/fetcher';

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

    console.log(`GitHub user: ${username}`);
    console.log(`Public repositories: ${repos.length}`);
    console.log('');

    console.log('Some repositories:');
    repos
      .slice(0, 6)
      .forEach((repo, index) => {
        console.log(`  ${index + 1}. ${repo.name}`);
      });
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
