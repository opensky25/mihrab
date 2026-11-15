import { useEffect, useMemo, useState } from 'react';
import { BellRing } from 'lucide-react';
import { TopBar, type LauncherTab } from './components/TopBar';
import { StatusStrip } from './components/StatusStrip';
import { HomeView } from './components/HomeView';
import { SportsView } from './components/SportsView';
import { PrayerView } from './components/PrayerView';
import { LiveTvNewsView } from './components/LiveTvNewsView';
import { AppsShieldView } from './components/AppsShieldView';
import { AdhanOverlay } from './components/AdhanOverlay';
import { AppLaunchModal } from './components/AppLaunchModal';
import {
  ADHAN_BACKGROUNDS,
  WORLD_CITIES,
  calculateDailyPrayerTimes,
  formatMinutesToHHMM,
  getCityLocalClock,
  getNextPrayerInfo,
  type AsrSchool,
  type CalculationMethodId,
  type PrayerAlertMode,
  type PrayerName,
} from './utils/prayerTimes';
import {
  SPORTS_MATCHES,
  findApproachingMatchReminders,
  toggleMatchReminder,
} from './utils/sportsData';
import {
  DEFAULT_SHIELD_RULES,
  INSTALLED_TV_APPS,
  UPSTREAM_LAUNCHER_FEED,
  evaluateFeedShield,
  type GeoRegion,
  type ShieldRules,
  type TvAppItem,
} from './utils/launcherShield';
import {
  LIVE_CHANNELS,
  NEWS_ARTICLES,
  filterChannelsByRegion,
  type LiveChannel,
} from './utils/newsAndChannels';
import {
  getLanguageOption,
  getTranslations,
  type LanguageCode,
} from './utils/i18n';
import {
  fetchCityWeather,
  getCityFallbackWeather,
  type TemperatureUnit,
  type WeatherForecastData,
} from './utils/weather';

const STORAGE_KEY = 'mihrab_tv_launcher_prefs_v1';

interface SavedPrefs {
  language: LanguageCode;
  temperatureUnit: TemperatureUnit;
  cityId: string;
  manualOffsetMinutes: number;
  methodId: CalculationMethodId;
  asrSchool: AsrSchool;
  backgroundId: string;
  activeRegion: GeoRegion;
  shieldRules: ShieldRules;
  alertModes: Record<PrayerName, PrayerAlertMode>;
  pinnedAppIds: string[];
  remindedMatchIds: string[];
}

const DEFAULT_PREFS: SavedPrefs = {
  language: 'en',
  temperatureUnit: 'C',
  cityId: 'makkah',
  manualOffsetMinutes: 0,
  methodId: 'UmmAlQura',
  asrSchool: 'Standard',
  backgroundId: ADHAN_BACKGROUNDS[0].id,
  activeRegion: 'MENA',
  shieldRules: DEFAULT_SHIELD_RULES,
  alertModes: {
    Fajr: 'adhan',
    Sunrise: 'banner',
    Dhuhr: 'adhan',
    Asr: 'adhan',
    Maghrib: 'adhan',
    Isha: 'adhan',
  },
  pinnedAppIds: INSTALLED_TV_APPS.map((a) => a.id),
  remindedMatchIds: [],
};

function loadSavedPrefs(): SavedPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<SavedPrefs>;
    return {
      ...DEFAULT_PREFS,
      ...parsed,
      shieldRules: { ...DEFAULT_SHIELD_RULES, ...(parsed.shieldRules ?? {}) },
      alertModes: { ...DEFAULT_PREFS.alertModes, ...(parsed.alertModes ?? {}) },
      remindedMatchIds: Array.isArray(parsed.remindedMatchIds)
        ? parsed.remindedMatchIds
        : DEFAULT_PREFS.remindedMatchIds,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export default function App() {
  const [prefs, setPrefs] = useState<SavedPrefs>(loadSavedPrefs);
  const [activeTab, setActiveTab] = useState<LauncherTab>('home');
  const [now, setNow] = useState<Date>(() => new Date());
  const [selectedChannelId, setSelectedChannelId] = useState<string>(LIVE_CHANNELS[0].id);
  const [launchingApp, setLaunchingApp] = useState<TvAppItem | null>(null);
  const [adhanOverlay, setAdhanOverlay] = useState<{
    prayerName: PrayerName;
    initialPhase: 'adhan' | 'supplications';
  } | null>(null);
  const [bannerAlert, setBannerAlert] = useState<PrayerName | null>(null);
  const [lastTriggeredMinuteKey, setLastTriggeredMinuteKey] = useState<string>('');
  const [dismissedMatchReminderIds, setDismissedMatchReminderIds] = useState<string[]>([]);
  const [previewMatchAlertId, setPreviewMatchAlertId] = useState<string | null>(null);

  const langMeta = useMemo(() => getLanguageOption(prefs.language), [prefs.language]);
  const t = useMemo(() => getTranslations(prefs.language), [prefs.language]);

  // Sync HTML document language and LTR/RTL direction
  useEffect(() => {
    document.documentElement.lang = langMeta.code;
    document.documentElement.dir = langMeta.direction;
  }, [langMeta.code, langMeta.direction]);

  // Tick real-time clock every second
  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Persist user launcher preferences
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage quota errors
    }
  }, [prefs]);

  const activeCity = useMemo(
    () => WORLD_CITIES.find((c) => c.id === prefs.cityId) ?? WORLD_CITIES[0],
    [prefs.cityId]
  );

  const [weather, setWeather] = useState<WeatherForecastData>(() =>
    getCityFallbackWeather(activeCity, new Date(), langMeta.localeTag)
  );
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setWeather(getCityFallbackWeather(activeCity, new Date(), langMeta.localeTag));
    setWeatherLoading(true);
    fetchCityWeather(activeCity, langMeta.localeTag, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setWeather(data);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setWeatherLoading(false);
        }
      });
    return () => controller.abort();
  }, [activeCity, langMeta.localeTag]);

  const cityClock = useMemo(
    () => getCityLocalClock(activeCity.ianaTimezone, prefs.manualOffsetMinutes, now),
    [activeCity.ianaTimezone, prefs.manualOffsetMinutes, now]
  );

  const approachingMatchAlert = useMemo(() => {
    if (previewMatchAlertId) {
      const match = SPORTS_MATCHES.find((m) => m.id === previewMatchAlertId);
      if (match) {
        const target =
          (match.dayOffset ?? 0) * 1440 + (match.kickoffMinutes ?? cityClock.totalMinutes + 15);
        const rawDiff = target - cityClock.totalMinutes;
        const minutesUntilKickoff = rawDiff >= 0 && rawDiff <= 180 ? rawDiff : 15;
        return { match, minutesUntilKickoff };
      }
    }
    return (
      findApproachingMatchReminders(
        SPORTS_MATCHES,
        prefs.remindedMatchIds,
        cityClock.totalMinutes,
        dismissedMatchReminderIds,
        30
      )[0] ?? null
    );
  }, [
    previewMatchAlertId,
    prefs.remindedMatchIds,
    cityClock.totalMinutes,
    dismissedMatchReminderIds,
  ]);

  // Escape closes modals/overlays; Arrow keys move spatial TV D-Pad focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (adhanOverlay) {
          setAdhanOverlay(null);
        } else if (launchingApp) {
          setLaunchingApp(null);
        } else if (bannerAlert) {
          setBannerAlert(null);
        } else if (previewMatchAlertId) {
          setPreviewMatchAlertId(null);
        } else if (approachingMatchAlert) {
          setDismissedMatchReminderIds((prev) =>
            prev.includes(approachingMatchAlert.match.id)
              ? prev
              : [...prev, approachingMatchAlert.match.id]
          );
        }
        return;
      }

      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], select, input')
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;

        const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        if (currentIndex === -1) {
          focusables[0].focus();
          return;
        }
        const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (currentIndex + delta + focusables.length) % focusables.length;
        focusables[nextIndex].focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adhanOverlay, launchingApp, bannerAlert, previewMatchAlertId, approachingMatchAlert]);

  const prayerTimes = useMemo(
    () =>
      calculateDailyPrayerTimes({
        year: cityClock.year,
        month: cityClock.month,
        day: cityClock.day,
        latitude: activeCity.latitude,
        longitude: activeCity.longitude,
        timezoneOffsetHours: cityClock.effectiveOffsetHours,
        methodId: prefs.methodId,
        asrSchool: prefs.asrSchool,
      }),
    [
      cityClock.year,
      cityClock.month,
      cityClock.day,
      cityClock.effectiveOffsetHours,
      activeCity.latitude,
      activeCity.longitude,
      prefs.methodId,
      prefs.asrSchool,
    ]
  );

  const nextPrayer = useMemo(
    () => getNextPrayerInfo(prayerTimes, cityClock.totalMinutes, cityClock.seconds),
    [prayerTimes, cityClock.totalMinutes, cityClock.seconds]
  );

  // Automatic prayer-time alert trigger when local city minute matches an enabled prayer
  useEffect(() => {
    const minuteKey = `${activeCity.id}-${cityClock.year}-${cityClock.month}-${cityClock.day}-${cityClock.totalMinutes}`;
    if (minuteKey === lastTriggeredMinuteKey) return;

    const prayerOrder: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    for (const p of prayerOrder) {
      if (prayerTimes[p] === cityClock.totalMinutes && cityClock.seconds < 5) {
        setLastTriggeredMinuteKey(minuteKey);
        const mode = prefs.alertModes[p];
        if (mode === 'adhan') {
          setAdhanOverlay({ prayerName: p, initialPhase: 'adhan' });
        } else if (mode === 'banner') {
          setBannerAlert(p);
        }
        break;
      }
    }
  }, [
    activeCity.id,
    cityClock.year,
    cityClock.month,
    cityClock.day,
    cityClock.totalMinutes,
    cityClock.seconds,
    prayerTimes,
    prefs.alertModes,
    lastTriggeredMinuteKey,
  ]);

  const selectedBackground = useMemo(
    () =>
      ADHAN_BACKGROUNDS.find((bg) => bg.id === prefs.backgroundId) ?? ADHAN_BACKGROUNDS[0],
    [prefs.backgroundId]
  );

  const { blockedItems } = useMemo(
    () => evaluateFeedShield(UPSTREAM_LAUNCHER_FEED, prefs.shieldRules, prefs.activeRegion),
    [prefs.shieldRules, prefs.activeRegion]
  );

  const permittedChannels = useMemo(
    () => filterChannelsByRegion(LIVE_CHANNELS, prefs.activeRegion),
    [prefs.activeRegion]
  );

  const activeChannel: LiveChannel = useMemo(
    () =>
      permittedChannels.find((c) => c.id === selectedChannelId) ??
      permittedChannels[0] ??
      LIVE_CHANNELS[0],
    [permittedChannels, selectedChannelId]
  );

  const appsWithPins = useMemo(
    () =>
      INSTALLED_TV_APPS.map((app) => ({
        ...app,
        pinnedOnHome: prefs.pinnedAppIds.includes(app.id),
      })),
    [prefs.pinnedAppIds]
  );

  const handleTogglePrayerAlert = (prayer: PrayerName) => {
    const cycle: Record<PrayerAlertMode, PrayerAlertMode> = {
      adhan: 'banner',
      banner: 'off',
      off: 'adhan',
    };
    setPrefs((prev) => ({
      ...prev,
      alertModes: {
        ...prev.alertModes,
        [prayer]: cycle[prev.alertModes[prayer]],
      },
    }));
  };

  const handleToggleRule = (key: keyof ShieldRules) => {
    setPrefs((prev) => ({
      ...prev,
      shieldRules: {
        ...prev.shieldRules,
        [key]: !prev.shieldRules[key],
      },
    }));
  };

  const handleTogglePinApp = (appId: string) => {
    setPrefs((prev) => {
      const exists = prev.pinnedAppIds.includes(appId);
      return {
        ...prev,
        pinnedAppIds: exists
          ? prev.pinnedAppIds.filter((id) => id !== appId)
          : [...prev.pinnedAppIds, appId],
      };
    });
  };

  const handleToggleMatchReminder = (matchId: string) => {
    setPrefs((prev) => ({
      ...prev,
      remindedMatchIds: toggleMatchReminder(prev.remindedMatchIds, matchId),
    }));
    setDismissedMatchReminderIds((prev) => prev.filter((id) => id !== matchId));
    if (previewMatchAlertId === matchId) {
      setPreviewMatchAlertId(null);
    }
  };

  const handleDismissMatchAlert = () => {
    if (!approachingMatchAlert) return;
    if (previewMatchAlertId === approachingMatchAlert.match.id) {
      setPreviewMatchAlertId(null);
    } else {
      setDismissedMatchReminderIds((prev) =>
        prev.includes(approachingMatchAlert.match.id)
          ? prev
          : [...prev, approachingMatchAlert.match.id]
      );
    }
  };

  return (
    <div dir={langMeta.direction} className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col">
      <TopBar
        activeTab={activeTab}
        t={t}
        onSelectTab={setActiveTab}
        onPreviewAdhan={() =>
          setAdhanOverlay({
            prayerName: nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name,
            initialPhase: 'adhan',
          })
        }
      />

      <StatusStrip
        city={activeCity}
        formattedTime={cityClock.formattedTime}
        formattedDate={cityClock.formattedDate}
        effectiveOffsetHours={cityClock.effectiveOffsetHours}
        nextPrayer={nextPrayer}
        blockedAdsCount={blockedItems.length}
        activeRegion={prefs.activeRegion}
        t={t}
        onOpenPrayerSettings={() => setActiveTab('prayer')}
        onOpenShieldSettings={() => setActiveTab('apps')}
      />

      {bannerAlert && (
        <div
          role="status"
          className="border-b border-[#F5B942]/40 bg-[#1A212E] px-6 py-3"
        >
          <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 text-sm">
            <span>
              <strong className="text-[#F5B942]">{t.prayer.names[bannerAlert]}</strong> ·{' '}
              {activeCity.name} (<span dir="ltr">{formatMinutesToHHMM(prayerTimes[bannerAlert])}</span>)
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAdhanOverlay({ prayerName: bannerAlert, initialPhase: 'adhan' });
                  setBannerAlert(null);
                }}
                className="tv-focus rounded-md bg-[#D99B38] px-3 py-1 text-xs font-semibold text-[#0A0D12]"
              >
                {t.actions.launchAdhanScreen}
              </button>
              <button
                type="button"
                onClick={() => setBannerAlert(null)}
                className="tv-focus text-xs text-slate-300 hover:text-white"
              >
                {t.actions.dismiss}
              </button>
            </div>
          </div>
        </div>
      )}

      {approachingMatchAlert && (
        <div
          role="status"
          data-testid="match-reminder-banner"
          className="border-b border-[#F5B942]/40 bg-[#1A212E] px-6 py-3"
        >
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-2.5">
              <BellRing className="h-4 w-4 shrink-0 text-[#F5B942]" />
              <span className="font-semibold text-[#F5B942]">
                {t.sports.kickoffAlertLabel}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-semibold text-white">
                {approachingMatchAlert.match.homeTeam} vs {approachingMatchAlert.match.awayTeam}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span dir="ltr" className="font-mono-tabular text-slate-300">
                {approachingMatchAlert.minutesUntilKickoff === 0
                  ? t.sports.kickoffApproaching
                  : `${approachingMatchAlert.minutesUntilKickoff} ${t.sports.kickoffInMinutes}`}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {approachingMatchAlert.match.broadcastChannel}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('sports');
                  handleDismissMatchAlert();
                }}
                className="tv-focus rounded-md bg-[#D99B38] px-3 py-1 text-xs font-semibold text-[#0A0D12]"
              >
                {t.sports.openSportsCenter}
              </button>
              <button
                type="button"
                onClick={handleDismissMatchAlert}
                className="tv-focus text-xs text-slate-300 hover:text-white"
              >
                {t.actions.dismiss}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[1380px] flex-1 px-6 py-8">
        {activeTab === 'home' && (
          <HomeView
            city={activeCity}
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            adhanBackground={selectedBackground}
            matches={SPORTS_MATCHES}
            apps={appsWithPins}
            channels={permittedChannels}
            news={NEWS_ARTICLES}
            activeRegion={prefs.activeRegion}
            blockedAdsCount={blockedItems.length}
            weather={weather}
            temperatureUnit={prefs.temperatureUnit}
            weatherLoading={weatherLoading}
            t={t}
            onNavigate={setActiveTab}
            onLaunchApp={(app) => setLaunchingApp(app)}
            onSelectChannel={(ch) => {
              setSelectedChannelId(ch.id);
              setActiveTab('livetv');
            }}
            onTriggerAdhan={(prayer) =>
              setAdhanOverlay({ prayerName: prayer, initialPhase: 'adhan' })
            }
            onChangeTemperatureUnit={(temperatureUnit) =>
              setPrefs((prev) => ({ ...prev, temperatureUnit }))
            }
          />
        )}

        {activeTab === 'sports' && (
          <SportsView
            t={t}
            remindedMatchIds={prefs.remindedMatchIds}
            onToggleReminder={handleToggleMatchReminder}
            onPreviewMatchAlert={(matchId) => setPreviewMatchAlertId(matchId)}
          />
        )}

        {activeTab === 'prayer' && (
          <PrayerView
            city={activeCity}
            manualOffsetMinutes={prefs.manualOffsetMinutes}
            effectiveOffsetHours={cityClock.effectiveOffsetHours}
            currentMinutes={cityClock.totalMinutes}
            currentSeconds={cityClock.seconds}
            formattedTimeWithSeconds={cityClock.formattedTimeWithSeconds}
            formattedDate={cityClock.formattedDate}
            methodId={prefs.methodId}
            asrSchool={prefs.asrSchool}
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            alertModes={prefs.alertModes}
            selectedBackground={selectedBackground}
            t={t}
            onSelectCity={(cityId) =>
              setPrefs((prev) => ({ ...prev, cityId, manualOffsetMinutes: 0 }))
            }
            onChangeManualOffset={(minutes) =>
              setPrefs((prev) => ({ ...prev, manualOffsetMinutes: minutes }))
            }
            onChangeMethod={(methodId) =>
              setPrefs((prev) => ({ ...prev, methodId }))
            }
            onChangeAsrSchool={(asrSchool) =>
              setPrefs((prev) => ({ ...prev, asrSchool }))
            }
            onTogglePrayerAlert={handleTogglePrayerAlert}
            onSelectBackground={(backgroundId) =>
              setPrefs((prev) => ({ ...prev, backgroundId }))
            }
            onTriggerAdhan={(prayer, startInSupplications) =>
              setAdhanOverlay({
                prayerName: prayer,
                initialPhase: startInSupplications ? 'supplications' : 'adhan',
              })
            }
          />
        )}

        {activeTab === 'livetv' && (
          <LiveTvNewsView
            channels={permittedChannels}
            activeChannel={activeChannel}
            activeRegion={prefs.activeRegion}
            t={t}
            onSelectChannel={(ch) => setSelectedChannelId(ch.id)}
          />
        )}

        {activeTab === 'apps' && (
          <AppsShieldView
            apps={appsWithPins}
            shieldRules={prefs.shieldRules}
            activeRegion={prefs.activeRegion}
            blockedItems={blockedItems}
            language={prefs.language}
            t={t}
            onChangeLanguage={(language) =>
              setPrefs((prev) => ({ ...prev, language }))
            }
            onToggleRule={handleToggleRule}
            onChangeRegion={(activeRegion) =>
              setPrefs((prev) => ({ ...prev, activeRegion }))
            }
            onLaunchApp={(app) => setLaunchingApp(app)}
            onTogglePinApp={handleTogglePinApp}
          />
        )}
      </main>

      {adhanOverlay && (
        <AdhanOverlay
          prayerName={adhanOverlay.prayerName}
          city={activeCity}
          localTime={cityClock.formattedTime}
          background={selectedBackground}
          initialPhase={adhanOverlay.initialPhase}
          t={t}
          onClose={() => setAdhanOverlay(null)}
        />
      )}

      {launchingApp && (
        <AppLaunchModal
          app={launchingApp}
          activeRegion={prefs.activeRegion}
          t={t}
          onClose={() => setLaunchingApp(null)}
        />
      )}
    </div>
  );
}
