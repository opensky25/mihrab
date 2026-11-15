import { Tv, ArrowRight, Play, ShieldCheck, Lock } from 'lucide-react';
import type {
  AdhanBackground,
  CityInfo,
  DailyPrayerTimes,
  NextPrayerInfo,
  PrayerName,
} from '../utils/prayerTimes';
import { formatMinutesToHHMM } from '../utils/prayerTimes';
import type { SportsMatch } from '../utils/sportsData';
import type { GeoRegion, TvAppItem } from '../utils/launcherShield';
import { isAppPermittedInRegion } from '../utils/launcherShield';
import type { LiveChannel, NewsArticle } from '../utils/newsAndChannels';
import type { LauncherTab } from './TopBar';
import type { Translations } from '../utils/i18n';
import { WeatherWidget } from './WeatherWidget';
import type { TemperatureUnit, WeatherForecastData } from '../utils/weather';

interface HomeViewProps {
  city: CityInfo;
  prayerTimes: DailyPrayerTimes;
  nextPrayer: NextPrayerInfo;
  adhanBackground: AdhanBackground;
  matches: SportsMatch[];
  apps: TvAppItem[];
  channels: LiveChannel[];
  news: NewsArticle[];
  activeRegion: GeoRegion;
  blockedAdsCount: number;
  weather: WeatherForecastData;
  temperatureUnit: TemperatureUnit;
  weatherLoading: boolean;
  t: Translations;
  onNavigate: (tab: LauncherTab) => void;
  onLaunchApp: (app: TvAppItem) => void;
  onSelectChannel: (channel: LiveChannel) => void;
  onTriggerAdhan: (prayerName: PrayerName) => void;
  onChangeTemperatureUnit: (unit: TemperatureUnit) => void;
}

const PRAYER_LIST: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function HomeView({
  city,
  prayerTimes,
  nextPrayer,
  adhanBackground,
  matches,
  apps,
  channels,
  news,
  activeRegion,
  blockedAdsCount,
  weather,
  temperatureUnit,
  weatherLoading,
  t,
  onNavigate,
  onLaunchApp,
  onSelectChannel,
  onTriggerAdhan,
  onChangeTemperatureUnit,
}: HomeViewProps) {
  const pinnedApps = apps.filter((a) => a.pinnedOnHome);
  const featuredMatches = matches.slice(0, 4);
  const featuredChannels = channels.slice(0, 4);
  const topNews = news.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Focal Anchor: 2-Column Balanced Split */}
      <section aria-label="Featured Sanctuary and Live Matchday" className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Dominant Focal Card: Prayer & Adhan Spotlight */}
        <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#121720] lg:col-span-7">
          <img
            src={adhanBackground.imageUrl}
            alt={adhanBackground.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/65 to-[#0A0D12]/30"
          />

          <div className="relative z-10 flex items-center justify-between gap-4 p-6">
            <div className="text-xs font-medium text-slate-200">
              <span>{city.name}, {city.country}</span>
              <span aria-hidden="true" className="mx-2 text-slate-400">·</span>
              <span className="text-[#F5B942]">{t.home.adhanBackdrop}: {adhanBackground.title}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                onTriggerAdhan(nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name)
              }
              className="tv-focus rounded-lg border border-white/20 bg-[#0A0D12]/75 px-3 py-1.5 text-xs font-medium text-slate-100 whitespace-nowrap shrink-0 backdrop-blur-sm transition-colors hover:border-[#F5B942] hover:text-[#F5B942]"
            >
              {t.home.simulateAdhan} ({t.prayer.names[nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name]})
            </button>
          </div>

          <div className="relative z-10 space-y-5 p-6 pt-10">
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-300">
                {t.home.nextScheduledPrayer} · {nextPrayer.isTomorrow ? t.home.tomorrow : t.home.today}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t.prayer.names[nextPrayer.name]} · <span dir="ltr">{nextPrayer.formattedTime}</span>
                </h1>
                <span className="font-mono-tabular text-lg font-medium text-[#F5B942]">
                  {t.status.inPrefix} <span dir="ltr">{nextPrayer.countdownFormatted}</span>
                </span>
              </div>
            </div>

            {/* Compact 6-Prayer Strip */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-4 sm:grid-cols-6">
              {PRAYER_LIST.map((p) => {
                const isNext = nextPrayer.name === p;
                return (
                  <div
                    key={p}
                    className={`rounded-lg px-2.5 py-2 ${
                      isNext
                        ? 'bg-[#D99B38]/20 border border-[#F5B942]/50'
                        : 'bg-[#0A0D12]/60 border border-white/10'
                    }`}
                  >
                    <div className={`text-[11px] font-medium ${isNext ? 'text-[#F5B942]' : 'text-slate-300'}`}>
                      {t.prayer.names[p]}
                    </div>
                    <div dir="ltr" className="font-mono-tabular mt-0.5 text-sm font-semibold text-white">
                      {formatMinutesToHHMM(prayerTimes[p])}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Balanced Column: Live Sports & Matchday Feed */}
        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121720] p-6 lg:col-span-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  {t.home.liveScoresFixtures}
                </h2>
                <p className="text-xs text-slate-400">
                  {t.home.matchdaySubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('sports')}
                className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:border-[#F5B942]/60 hover:text-[#F5B942]"
              >
                <span>{t.actions.fullStandings}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {featuredMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-1 last:pb-1"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {match.status === 'live' ? (
                        <span className="font-mono-tabular font-semibold text-emerald-400">
                          {t.sports.live} · {match.minuteOrTime}
                        </span>
                      ) : (
                        <span className="font-mono-tabular text-slate-400">
                          {match.dateLabel} · {match.minuteOrTime}
                        </span>
                      )}
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="truncate">{match.broadcastChannel}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2 text-sm font-medium text-slate-100">
                      <span className="truncate">
                        {match.homeTeam} vs {match.awayTeam}
                      </span>
                    </div>
                  </div>

                  <div dir="ltr" className="font-mono-tabular shrink-0 rounded-md border border-white/10 bg-[#0A0D12] px-2.5 py-1 text-sm font-semibold text-white">
                    {match.homeScore !== null && match.awayScore !== null
                      ? `${match.homeScore} - ${match.awayScore}`
                      : 'vs'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs text-slate-400">
            <span>{t.home.leaguesTracked}</span>
            <button
              type="button"
              onClick={() => onNavigate('prayer')}
              className="tv-focus font-medium text-[#F5B942] hover:underline whitespace-nowrap shrink-0"
            >
              {t.actions.adjustCityTimezone}
            </button>
          </div>
        </div>
      </section>

      {/* Local Weather Forecast Widget for Selected City */}
      <WeatherWidget
        city={city}
        weather={weather}
        unit={temperatureUnit}
        loading={weatherLoading}
        t={t}
        onChangeUnit={onChangeTemperatureUnit}
        onChangeCity={() => onNavigate('prayer')}
      />

      {/* Installed TV Apps Shelf (Explicitly Ad-Free & Geo-Filtered) */}
      <section aria-label={t.home.tvAppsTitle} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              {t.home.tvAppsTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {blockedAdsCount} {t.home.tvAppsSubtitle} · {t.status.region}: {activeRegion}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('apps')}
            className="tv-focus flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-[#F5B942] whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{t.actions.manageShieldApps}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {pinnedApps.map((app) => {
            const permitted = isAppPermittedInRegion(app, activeRegion);
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onLaunchApp(app)}
                className={`tv-focus group flex flex-col items-start justify-between rounded-xl border p-4 text-start transition-all duration-150 ${
                  permitted
                    ? 'border-white/10 bg-[#121720] hover:border-[#F5B942]/70 hover:bg-[#18202C] hover:-translate-y-0.5'
                    : 'border-white/5 bg-[#0E131B] opacity-65 hover:border-amber-500/40'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                    style={{ backgroundColor: app.accentHex }}
                  >
                    {app.shortCode}
                  </div>
                  {!permitted && (
                    <Lock
                      aria-label={t.home.geoRestricted}
                      className="h-3.5 w-3.5 text-amber-400"
                    />
                  )}
                </div>

                <div className="mt-4 w-full">
                  <div className="truncate text-sm font-semibold text-slate-100 group-hover:text-white">
                    {app.name}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-slate-400">
                    {permitted ? (app.adFreeWrapper ? t.home.adFreeLaunch : app.category) : t.home.geoRestricted}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Live TV Channels & News Split */}
      <section aria-label={t.home.liveChannelsTitle} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Live Channels */}
        <div className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 lg:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                {t.home.liveChannelsTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.home.liveChannelsSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('livetv')}
              className="tv-focus flex items-center gap-1.5 text-xs font-medium text-[#F5B942] hover:underline whitespace-nowrap shrink-0"
            >
              <Tv className="h-3.5 w-3.5" />
              <span>{t.actions.openLiveTv}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {featuredChannels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => onSelectChannel(channel)}
                className="tv-focus flex flex-col justify-between rounded-lg border border-white/10 bg-[#0D1118] p-4 text-start transition-colors hover:border-[#F5B942]/60 hover:bg-[#161D29]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono-tabular font-semibold text-slate-300">
                      CH {channel.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{channel.quality}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <Play className="h-3 w-3 fill-current" />
                    {t.sports.live}
                  </span>
                </div>

                <div className="mt-2.5">
                  <div className="text-sm font-semibold text-white">{channel.name}</div>
                  <div className="mt-1 truncate text-xs text-slate-400">
                    {channel.nowPlaying}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Top News Headlines */}
        <div className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                {t.home.topNewsTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.home.topNewsSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('livetv')}
              className="tv-focus text-xs font-medium text-[#F5B942] hover:underline whitespace-nowrap shrink-0"
            >
              {t.actions.allStories}
            </button>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {topNews.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => onNavigate('livetv')}
                className="tv-focus block w-full py-3 text-start first:pt-1 last:pb-1 transition-colors hover:text-[#F5B942]"
              >
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.source}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAgo}</span>
                </div>
                <div className="mt-1 text-sm font-medium leading-snug text-slate-100">
                  {article.headline}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
