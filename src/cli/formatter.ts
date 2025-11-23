import type { RepoStats } from '../types/repoStats';

const HR = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

function drawHeader(username: string): string {
  return `📊 Repo stats for @${username}\n${HR}`;
}

function drawSectionTitle(title: string): string {
  return `\n${title}\n──────────────────────────`;
}

export function formatSummary(stats: RepoStats): string {
  return [
    drawSectionTitle('📌 Summary'),
    `• Repositories : ${String(stats.totalRepos).padStart(4)}`,
    `• Stars        : ${String(stats.totalStars).padStart(4)}`,
    `• Forks        : ${String(stats.totalForks).padStart(4)}`,
  ].join('\n');
}

export function formatLanguages(stats: RepoStats): string {
  const sorted = Object.entries(stats.languages).sort((a, b) => b[1] - a[1]);

  const lines = sorted.map(
    ([lang, count]) => `• ${lang.padEnd(12)} : ${String(count).padStart(3)}`
  );

  return [drawSectionTitle(`📝 Languages (${sorted.length})`), ...lines].join('\n');
}

export function formatTopStarred(stats: RepoStats): string {
  const lines = stats.topStarred.map(
    (r, i) => `${i + 1}. ${r.name} (${r.stars}★)`
  );
  return [drawSectionTitle('⭐ Top starred repositories'), ...lines].join('\n');
}

export function formatTopForked(stats: RepoStats): string {
  const lines = stats.topForked.map(
    (r, i) => `${i + 1}. ${r.name} (${r.forks} forks)`
  );
  return [drawSectionTitle('🍴 Top forked repositories'), ...lines].join('\n');
}

export function formatRecentUpdates(stats: RepoStats): string {
  const lines = stats.recentlyUpdated.map(
    (r, i) => `${i + 1}. ${r.name} (${r.updated_at})`
  );
  return [drawSectionTitle('⏱  Recently updated'), ...lines].join('\n');
}

export function formatRepoStats(username: string, stats: RepoStats): string {
  return [
    drawHeader(username),
    formatSummary(stats),
    formatLanguages(stats),
    formatTopStarred(stats),
    formatTopForked(stats),
    formatRecentUpdates(stats),
    '\n\n',
  ].join('\n');
}
