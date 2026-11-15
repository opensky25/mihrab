import { useState } from 'react';
import { Trophy, Calendar, Radio, Bell, BellRing } from 'lucide-react';
import {
  SPORTS_LEAGUES,
  SPORTS_MATCHES,
  filterMatches,
  getSortedStandings,
  type LeagueId,
  type MatchStatus,
} from '../utils/sportsData';
import type { Translations } from '../utils/i18n';

interface SportsViewProps {
  t: Translations;
  remindedMatchIds: string[];
  onToggleReminder: (matchId: string) => void;
  onPreviewMatchAlert: (matchId: string) => void;
}

export function SportsView({
  t,
  remindedMatchIds,
  onToggleReminder,
  onPreviewMatchAlert,
}: SportsViewProps) {
  const [selectedLeague, setSelectedLeague] = useState<LeagueId | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<MatchStatus | 'all' | 'reminders'>('all');
  const [standingsLeague, setStandingsLeague] = useState<LeagueId>('epl');

  const filteredMatches = filterMatches(
    SPORTS_MATCHES,
    selectedLeague,
    selectedStatus,
    remindedMatchIds
  );
  const standings = getSortedStandings(standingsLeague);
  const activeStandingsLeague = SPORTS_LEAGUES.find((l) => l.id === standingsLeague)!;

  const handleLeagueSelect = (league: LeagueId | 'all') => {
    setSelectedLeague(league);
    if (league !== 'all') {
      setStandingsLeague(league);
    }
  };

  const statusLabels: Record<MatchStatus | 'all' | 'reminders', string> = {
    all: t.sports.all,
    live: t.sports.live,
    upcoming: t.sports.upcoming,
    finished: t.sports.finished,
    reminders: t.sports.reminders,
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter Bar */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.sports.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t.sports.subtitle}
          </p>
        </div>

        {/* League Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-[#121720] p-1">
          <button
            type="button"
            onClick={() => handleLeagueSelect('all')}
            className={`tv-focus rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedLeague === 'all'
                ? 'bg-[#D99B38] text-[#0A0D12] font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.sports.allLeagues}
          </button>
          {SPORTS_LEAGUES.map((league) => (
            <button
              key={league.id}
              type="button"
              onClick={() => handleLeagueSelect(league.id)}
              className={`tv-focus rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                selectedLeague === league.id
                  ? 'bg-[#D99B38] text-[#0A0D12] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {league.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Match Schedule & Live Scores (6 cols) + League Standings (6 cols) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: Live Scores & Schedules */}
        <section aria-label={t.sports.scoresSchedule} className="space-y-4 xl:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Calendar className="h-4 w-4 text-[#F5B942]" />
              <span>{t.sports.scoresSchedule}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#121720] p-1">
              {(['all', 'live', 'upcoming', 'finished', 'reminders'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`tv-focus rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    selectedStatus === status
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {statusLabels[status]}
                  {status === 'reminders' && remindedMatchIds.length > 0 && (
                    <span dir="ltr" className="font-mono-tabular ms-1 text-[#F5B942]">
                      ({remindedMatchIds.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filteredMatches.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#121720] p-8 text-center">
              <p className="text-sm font-medium text-slate-200">
                {t.sports.emptyMatches}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLeague('all');
                  setSelectedStatus('all');
                }}
                className="tv-focus mt-3 rounded-lg bg-[#D99B38] px-4 py-2 text-xs font-semibold text-[#0A0D12]"
              >
                {t.sports.resetFilters}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMatches.map((match) => {
                const league = SPORTS_LEAGUES.find((l) => l.id === match.leagueId);
                const isReminded = remindedMatchIds.includes(match.id);
                return (
                  <div
                    key={match.id}
                    className="rounded-xl border border-white/10 bg-[#121720] p-4 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                      <div>
                        <span className="font-medium text-slate-300">{league?.name}</span>
                        <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
                        <span>{match.venue}</span>
                      </div>
                      {match.status === 'live' ? (
                        <span className="font-mono-tabular flex items-center gap-1 font-semibold text-emerald-400">
                          <Radio className="h-3 w-3" />
                          {t.sports.live} {match.minuteOrTime}
                        </span>
                      ) : (
                        <span className="font-mono-tabular text-slate-300">
                          {match.dateLabel} · {match.minuteOrTime}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">
                            {match.homeTeam}
                          </span>
                          <span dir="ltr" className="font-mono-tabular text-base font-bold text-white">
                            {match.homeScore ?? '—'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-200">
                            {match.awayTeam}
                          </span>
                          <span dir="ltr" className="font-mono-tabular text-base font-bold text-slate-200">
                            {match.awayScore ?? '—'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5 text-[11px] text-slate-400">
                      <span>
                        {t.sports.broadcast}: {match.broadcastChannel}
                      </span>

                      {match.status === 'upcoming' && (
                        <div className="flex items-center gap-2">
                          {isReminded && (
                            <button
                              type="button"
                              onClick={() => onPreviewMatchAlert(match.id)}
                              className="tv-focus rounded px-2 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:text-white"
                            >
                              {t.sports.previewAlert}
                            </button>
                          )}
                          <button
                            type="button"
                            aria-pressed={isReminded}
                            onClick={() => onToggleReminder(match.id)}
                            className={`tv-focus inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                              isReminded
                                ? 'border-[#F5B942]/35 bg-[#D99B38]/15 text-[#F5B942] hover:bg-[#D99B38]/25'
                                : 'border-white/15 bg-white/[0.04] text-slate-200 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {isReminded ? (
                              <BellRing className="h-3.5 w-3.5 text-[#F5B942]" />
                            ) : (
                              <Bell className="h-3.5 w-3.5 text-slate-400" />
                            )}
                            <span>{isReminded ? t.sports.reminderSet : t.sports.remindMe}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Right: League Standings Table */}
        <section aria-label={t.sports.standings} className="space-y-4 xl:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Trophy className="h-4 w-4 text-[#F5B942]" />
              <span>{activeStandingsLeague.name} · {t.sports.standings}</span>
            </h2>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#121720] p-1">
              {SPORTS_LEAGUES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setStandingsLeague(l.id)}
                  className={`tv-focus rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    standingsLeague === l.id
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121720]">
            <table className="w-full border-collapse text-start text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-slate-400">
                  <th className="py-3 ps-4 pe-2 font-medium">#</th>
                  <th className="py-3 px-2 font-medium">{t.sports.club}</th>
                  <th className="py-3 px-2 text-end font-medium">P</th>
                  <th className="py-3 px-2 text-end font-medium">W</th>
                  <th className="py-3 px-2 text-end font-medium">D</th>
                  <th className="py-3 px-2 text-end font-medium">L</th>
                  <th className="py-3 px-2 text-end font-medium">GD</th>
                  <th className="py-3 px-2 text-end font-medium">PTS</th>
                  <th className="hidden py-3 ps-2 pe-4 text-end font-medium sm:table-cell">{t.sports.form}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {standings.map((row) => (
                  <tr key={row.code} className="transition-colors hover:bg-white/[0.03]">
                    <td className="font-mono-tabular py-3 ps-4 pe-2 text-xs text-slate-400">
                      {row.rank}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-100">
                      {row.team}
                    </td>
                    <td className="font-mono-tabular py-3 px-2 text-end text-xs text-slate-300">
                      {row.played}
                    </td>
                    <td className="font-mono-tabular py-3 px-2 text-end text-xs text-slate-300">
                      {row.won}
                    </td>
                    <td className="font-mono-tabular py-3 px-2 text-end text-xs text-slate-300">
                      {row.drawn}
                    </td>
                    <td className="font-mono-tabular py-3 px-2 text-end text-xs text-slate-300">
                      {row.lost}
                    </td>
                    <td dir="ltr" className="font-mono-tabular py-3 px-2 text-end text-xs text-slate-300">
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="font-mono-tabular py-3 px-2 text-end text-sm font-bold text-[#F5B942]">
                      {row.points}
                    </td>
                    <td className="hidden py-3 ps-2 pe-4 text-end sm:table-cell">
                      <span dir="ltr" className="font-mono-tabular inline-flex items-center gap-1.5 text-[11px] font-semibold">
                        {row.form.map((res, i) => (
                          <span
                            key={i}
                            className={
                              res === 'W'
                                ? 'text-emerald-400'
                                : res === 'D'
                                  ? 'text-slate-400'
                                  : 'text-rose-400'
                            }
                          >
                            {res}
                          </span>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
