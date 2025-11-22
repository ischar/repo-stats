// src/formatter.ts
import type { RepoStats } from '../types/repoStats';

export function formatRepoStats(username: string, stats: RepoStats): string {
  const lines: string[] = [];

  lines.push(`📊 Repo stats for @${username}`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  lines.push('📌 Summary');
  lines.push('  ───────────────────────────');
  lines.push(`  • Repositories : ${String(stats.totalRepos).padStart(4, ' ')}`);
  lines.push(`  • Stars        : ${String(stats.totalStars).padStart(4, ' ')}`);
  lines.push(`  • Forks        : ${String(stats.totalForks).padStart(4, ' ')}`);
  lines.push('');

  const languageEntries = Object.entries(stats.languages);
  lines.push(`📝 Languages (${languageEntries.length})`);
  lines.push('  ───────────────────────────');
  if (languageEntries.length === 0) {
    lines.push('  • (no language information)');
  } else {
    languageEntries
      .sort(([, a], [, b]) => b - a)
      .forEach(([lang, count]) => {
        lines.push(`  • ${lang.padEnd(12, ' ')}: ${String(count).padStart(2, ' ')}`);
      });
  }
  lines.push('');

  lines.push('⭐ Top starred repositories');
  lines.push('  ───────────────────────────');
  if (stats.topStarred.length === 0) {
    lines.push('  • (no starred repositories)');
  } else {
    stats.topStarred.forEach((repo, idx) => {
      lines.push(`  ${idx + 1}. ${repo.name} (${repo.stars}★)`);
    });
  }
  lines.push('');

  lines.push('🍴 Top forked repositories');
  lines.push('  ───────────────────────────');
  if (stats.topForked.length === 0) {
    lines.push('  • (no forked repositories)');
  } else {
    stats.topForked.forEach((repo, idx) => {
      lines.push(`  ${idx + 1}. ${repo.name} (${repo.forks} forks)`);
    });
  }
  lines.push('');

  lines.push('⏱  Recently updated');
  lines.push('  ───────────────────────────');
  if (stats.recentlyUpdated.length === 0) {
    lines.push('  • (no recently updated repositories)');
  } else {
    stats.recentlyUpdated.forEach((repo, idx) => {
      lines.push(`  ${idx + 1}. ${repo.name} (${repo.updated_at})`);
    });
  }

  return lines.join('\n');
}
