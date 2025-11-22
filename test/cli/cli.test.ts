import { describe, it, expect } from 'vitest';
import { execFile } from 'node:child_process';
import { join } from 'node:path';
import 'dotenv/config';

function runCLI(
  args: string[],
  envOverride?: NodeJS.ProcessEnv,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const cliPath = join(__dirname, '../../dist/cli/index.js');
    const env = { ...process.env, ...envOverride };

    execFile('node', [cliPath, ...args], { env }, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stdout, stderr });
      }
      resolve({ stdout, stderr });
    });
  });
}

describe('CLI - repo-stats', () => {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error('GITHUB_USERNAME must be set in .env for CLI tests.');
  }

  it('should run CLI and output repository count', async () => {
    const { stdout } = await runCLI([username]);

    expect(stdout).toContain(`GitHub user: ${username}`);
  });

  it('should print usage info when username is missing', async () => {
    try {
      await runCLI([], { GITHUB_USERNAME: '' });
      throw new Error('Expected CLI to fail for missing username');
    } catch (result: any) {
      const stderr = result?.stderr ?? result?.error?.message ?? '';
      expect(stderr).toContain('GitHub username is required');
    }
  });
});
