export type LeagueId = 'epl' | 'laliga' | 'ucl' | 'spl';
export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface SportsLeague {
  id: LeagueId;
  name: string;
  country: string;
  season: string;
}

export interface SportsMatch {
  id: string;
  leagueId: LeagueId;
  homeTeam: string;
  homeCode: string;
  awayTeam: string;
  awayCode: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  minuteOrTime: string;
  dateLabel: string;
  dayOffset?: number;
  kickoffMinutes?: number;
  venue: string;
  broadcastChannel: string;
}

export interface StandingRow {
  rank: number;
  team: string;
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
  form: string[];
}

export const SPORTS_LEAGUES: SportsLeague[] = [
  { id: 'epl', name: 'Premier League', country: 'England', season: '2026/27' },
  { id: 'laliga', name: 'La Liga', country: 'Spain', season: '2026/27' },
  { id: 'ucl', name: 'UEFA Champions League', country: 'Europe', season: '2026/27' },
  { id: 'spl', name: 'Saudi Pro League', country: 'Saudi Arabia', season: '2026/27' },
];

export const SPORTS_MATCHES: SportsMatch[] = [
  {
    id: 'm1',
    leagueId: 'epl',
    homeTeam: 'Arsenal',
    homeCode: 'ARS',
    awayTeam: 'Liverpool',
    awayCode: 'LIV',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minuteOrTime: "67'",
    dateLabel: 'Today',
    venue: 'Emirates Stadium',
    broadcastChannel: 'beIN Sports 1 HD',
  },
  {
    id: 'm2',
    leagueId: 'laliga',
    homeTeam: 'Real Madrid',
    homeCode: 'RMA',
    awayTeam: 'Barcelona',
    awayCode: 'BAR',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    minuteOrTime: "54'",
    dateLabel: 'Today',
    venue: 'Santiago Bernabéu',
    broadcastChannel: 'beIN Sports 3 HD',
  },
  {
    id: 'm3',
    leagueId: 'spl',
    homeTeam: 'Al-Hilal',
    homeCode: 'HIL',
    awayTeam: 'Al-Ittihad',
    awayCode: 'ITT',
    homeScore: 3,
    awayScore: 2,
    status: 'live',
    minuteOrTime: "82'",
    dateLabel: 'Today',
    venue: 'Kingdom Arena',
    broadcastChannel: 'SSC Sports 1',
  },
  {
    id: 'm4',
    leagueId: 'epl',
    homeTeam: 'Manchester City',
    homeCode: 'MCI',
    awayTeam: 'Chelsea',
    awayCode: 'CHE',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    minuteOrTime: '20:30',
    dateLabel: 'Today',
    dayOffset: 0,
    kickoffMinutes: 20 * 60 + 30,
    venue: 'Etihad Stadium',
    broadcastChannel: 'beIN Sports 1 HD',
  },
  {
    id: 'm9',
    leagueId: 'ucl',
    homeTeam: 'Borussia Dortmund',
    homeCode: 'BVB',
    awayTeam: 'Atlético Madrid',
    awayCode: 'ATM',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    minuteOrTime: '18:30',
    dateLabel: 'Today',
    dayOffset: 0,
    kickoffMinutes: 18 * 60 + 30,
    venue: 'Signal Iduna Park',
    broadcastChannel: 'beIN Sports 2 HD',
  },
  {
    id: 'm5',
    leagueId: 'ucl',
    homeTeam: 'Bayern Munich',
    homeCode: 'BAY',
    awayTeam: 'Inter Milan',
    awayCode: 'INT',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    minuteOrTime: '22:00',
    dateLabel: 'Tomorrow',
    dayOffset: 1,
    kickoffMinutes: 22 * 60,
    venue: 'Allianz Arena',
    broadcastChannel: 'beIN Sports 2 HD',
  },
  {
    id: 'm6',
    leagueId: 'spl',
    homeTeam: 'Al-Nassr',
    homeCode: 'NAS',
    awayTeam: 'Al-Ahli',
    awayCode: 'AHL',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    minuteOrTime: '21:00',
    dateLabel: 'Tomorrow',
    dayOffset: 1,
    kickoffMinutes: 21 * 60,
    venue: 'Al-Awwal Park',
    broadcastChannel: 'SSC Sports 1',
  },
  {
    id: 'm7',
    leagueId: 'laliga',
    homeTeam: 'Atlético Madrid',
    homeCode: 'ATM',
    awayTeam: 'Athletic Club',
    awayCode: 'ATH',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    minuteOrTime: 'FT',
    dateLabel: 'Yesterday',
    venue: 'Metropolitano',
    broadcastChannel: 'beIN Sports 3 HD',
  },
  {
    id: 'm8',
    leagueId: 'ucl',
    homeTeam: 'Paris Saint-Germain',
    homeCode: 'PSG',
    awayTeam: 'AC Milan',
    awayCode: 'ACM',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    minuteOrTime: 'FT',
    dateLabel: 'Yesterday',
    venue: 'Parc des Princes',
    broadcastChannel: 'beIN Sports 2 HD',
  },
];

export const LEAGUE_STANDINGS: Record<LeagueId, StandingRow[]> = {
  epl: [
    { rank: 1, team: 'Arsenal', code: 'ARS', played: 12, won: 9, drawn: 2, lost: 1, gd: 18, points: 29, form: ['W', 'W', 'D', 'W', 'W'] },
    { rank: 2, team: 'Liverpool', code: 'LIV', played: 12, won: 9, drawn: 1, lost: 2, gd: 16, points: 28, form: ['W', 'W', 'W', 'L', 'W'] },
    { rank: 3, team: 'Manchester City', code: 'MCI', played: 11, won: 8, drawn: 2, lost: 1, gd: 15, points: 26, form: ['D', 'W', 'W', 'W', 'D'] },
    { rank: 4, team: 'Chelsea', code: 'CHE', played: 11, won: 7, drawn: 2, lost: 2, gd: 11, points: 23, form: ['W', 'D', 'W', 'L', 'W'] },
    { rank: 5, team: 'Aston Villa', code: 'AVL', played: 12, won: 6, drawn: 3, lost: 3, gd: 6, points: 21, form: ['L', 'W', 'D', 'W', 'D'] },
    { rank: 6, team: 'Newcastle United', code: 'NEW', played: 12, won: 6, drawn: 2, lost: 4, gd: 4, points: 20, form: ['W', 'L', 'W', 'W', 'L'] },
  ],
  laliga: [
    { rank: 1, team: 'Barcelona', code: 'BAR', played: 13, won: 10, drawn: 2, lost: 1, gd: 24, points: 32, form: ['W', 'W', 'W', 'D', 'W'] },
    { rank: 2, team: 'Real Madrid', code: 'RMA', played: 13, won: 9, drawn: 3, lost: 1, gd: 19, points: 30, form: ['W', 'D', 'W', 'W', 'D'] },
    { rank: 3, team: 'Atlético Madrid', code: 'ATM', played: 13, won: 8, drawn: 3, lost: 2, gd: 13, points: 27, form: ['W', 'W', 'D', 'L', 'W'] },
    { rank: 4, team: 'Athletic Club', code: 'ATH', played: 13, won: 7, drawn: 3, lost: 3, gd: 9, points: 24, form: ['D', 'W', 'W', 'L', 'L'] },
    { rank: 5, team: 'Villarreal', code: 'VIL', played: 13, won: 6, drawn: 4, lost: 3, gd: 5, points: 22, form: ['W', 'D', 'L', 'W', 'D'] },
    { rank: 6, team: 'Real Sociedad', code: 'RSO', played: 13, won: 6, drawn: 2, lost: 5, gd: 2, points: 20, form: ['L', 'W', 'W', 'L', 'W'] },
  ],
  ucl: [
    { rank: 1, team: 'Liverpool', code: 'LIV', played: 5, won: 5, drawn: 0, lost: 0, gd: 11, points: 15, form: ['W', 'W', 'W', 'W', 'W'] },
    { rank: 2, team: 'Inter Milan', code: 'INT', played: 5, won: 4, drawn: 1, lost: 0, gd: 8, points: 13, form: ['D', 'W', 'W', 'W', 'W'] },
    { rank: 3, team: 'Barcelona', code: 'BAR', played: 5, won: 4, drawn: 0, lost: 1, gd: 12, points: 12, form: ['L', 'W', 'W', 'W', 'W'] },
    { rank: 4, team: 'Bayern Munich', code: 'BAY', played: 5, won: 3, drawn: 1, lost: 1, gd: 7, points: 10, form: ['W', 'L', 'W', 'D', 'W'] },
    { rank: 5, team: 'Paris Saint-Germain', code: 'PSG', played: 5, won: 3, drawn: 1, lost: 1, gd: 5, points: 10, form: ['W', 'D', 'L', 'W', 'W'] },
    { rank: 6, team: 'Arsenal', code: 'ARS', played: 5, won: 3, drawn: 1, lost: 1, gd: 4, points: 10, form: ['D', 'W', 'W', 'L', 'W'] },
  ],
  spl: [
    { rank: 1, team: 'Al-Hilal', code: 'HIL', played: 11, won: 10, drawn: 1, lost: 0, gd: 23, points: 31, form: ['W', 'W', 'W', 'D', 'W'] },
    { rank: 2, team: 'Al-Ittihad', code: 'ITT', played: 11, won: 9, drawn: 1, lost: 1, gd: 18, points: 28, form: ['W', 'W', 'W', 'W', 'L'] },
    { rank: 3, team: 'Al-Nassr', code: 'NAS', played: 11, won: 7, drawn: 3, lost: 1, gd: 14, points: 24, form: ['W', 'D', 'W', 'W', 'D'] },
    { rank: 4, team: 'Al-Qadsiah', code: 'QAD', played: 11, won: 7, drawn: 1, lost: 3, gd: 8, points: 22, form: ['W', 'L', 'W', 'W', 'W'] },
    { rank: 5, team: 'Al-Shabab', code: 'SHB', played: 11, won: 6, drawn: 2, lost: 3, gd: 6, points: 20, form: ['D', 'W', 'L', 'W', 'W'] },
    { rank: 6, team: 'Al-Ahli', code: 'AHL', played: 11, won: 5, drawn: 2, lost: 4, gd: 5, points: 17, form: ['L', 'W', 'D', 'W', 'L'] },
  ],
};

export function filterMatches(
  matches: SportsMatch[],
  leagueId: LeagueId | 'all',
  status: MatchStatus | 'all' | 'reminders',
  remindedMatchIds: string[] = []
): SportsMatch[] {
  return matches.filter((m) => {
    const leagueOk = leagueId === 'all' || m.leagueId === leagueId;
    if (!leagueOk) return false;
    if (status === 'reminders') {
      return m.status === 'upcoming' && remindedMatchIds.includes(m.id);
    }
    return status === 'all' || m.status === status;
  });
}

export function toggleMatchReminder(remindedIds: string[], matchId: string): string[] {
  if (remindedIds.includes(matchId)) {
    return remindedIds.filter((id) => id !== matchId);
  }
  return [...remindedIds, matchId];
}

export interface ApproachingMatchReminder {
  match: SportsMatch;
  minutesUntilKickoff: number;
}

export function findApproachingMatchReminders(
  matches: SportsMatch[],
  remindedMatchIds: string[],
  currentTotalMinutes: number,
  dismissedMatchIds: string[] = [],
  leadMinutes: number = 30
): ApproachingMatchReminder[] {
  const results: ApproachingMatchReminder[] = [];

  for (const match of matches) {
    if (match.status !== 'upcoming') continue;
    if (!remindedMatchIds.includes(match.id)) continue;
    if (dismissedMatchIds.includes(match.id)) continue;
    if (typeof match.kickoffMinutes !== 'number') continue;

    const targetMinutes = (match.dayOffset ?? 0) * 1440 + match.kickoffMinutes;
    const minutesUntilKickoff = targetMinutes - currentTotalMinutes;
    if (minutesUntilKickoff >= 0 && minutesUntilKickoff <= leadMinutes) {
      results.push({ match, minutesUntilKickoff });
    }
  }

  return results.sort((a, b) => a.minutesUntilKickoff - b.minutesUntilKickoff);
}

export function getSortedStandings(leagueId: LeagueId): StandingRow[] {
  const rows = LEAGUE_STANDINGS[leagueId] ?? [];
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return a.rank - b.rank;
  });
}
