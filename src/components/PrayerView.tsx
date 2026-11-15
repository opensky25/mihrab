import { useState, useMemo } from 'react';
import { Bell, BellOff, Volume2, Globe, Search, RotateCcw, Image as ImageIcon } from 'lucide-react';
import {
  ADHAN_BACKGROUNDS,
  CALCULATION_METHODS,
  POST_ADHAN_SUPPLICATIONS,
  WORLD_CITIES,
  formatMinutesToHHMM,
  formatUtcOffsetLabel,
  type AdhanBackground,
  type AsrSchool,
  type CalculationMethodId,
  type CityInfo,
  type DailyPrayerTimes,
  type NextPrayerInfo,
  type PrayerAlertMode,
  type PrayerName,
} from '../utils/prayerTimes';
import type { Translations } from '../utils/i18n';

interface PrayerViewProps {
  city: CityInfo;
  manualOffsetMinutes: number;
  effectiveOffsetHours: number;
  formattedTimeWithSeconds: string;
  formattedDate: string;
  methodId: CalculationMethodId;
  asrSchool: AsrSchool;
  prayerTimes: DailyPrayerTimes;
  nextPrayer: NextPrayerInfo;
  alertModes: Record<PrayerName, PrayerAlertMode>;
  selectedBackground: AdhanBackground;
  t: Translations;
  onSelectCity: (cityId: string) => void;
  onChangeManualOffset: (minutes: number) => void;
  onChangeMethod: (methodId: CalculationMethodId) => void;
  onChangeAsrSchool: (school: AsrSchool) => void;
  onTogglePrayerAlert: (prayer: PrayerName) => void;
  onSelectBackground: (bgId: string) => void;
  onTriggerAdhan: (prayer: PrayerName, startInSupplications?: boolean) => void;
}

const PRAYER_NAMES: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function PrayerView({
  city,
  manualOffsetMinutes,
  effectiveOffsetHours,
  formattedTimeWithSeconds,
  formattedDate,
  methodId,
  asrSchool,
  prayerTimes,
  nextPrayer,
  alertModes,
  selectedBackground,
  t,
  onSelectCity,
  onChangeManualOffset,
  onChangeMethod,
  onChangeAsrSchool,
  onTogglePrayerAlert,
  onSelectBackground,
  onTriggerAdhan,
}: PrayerViewProps) {
  const [cityQuery, setCityQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<'ALL' | CityInfo['region']>('ALL');

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    return WORLD_CITIES.filter((c) => {
      const regionMatch = regionFilter === 'ALL' || c.region === regionFilter;
      const queryMatch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.ianaTimezone.toLowerCase().includes(q);
      return regionMatch && queryMatch;
    });
  }, [cityQuery, regionFilter]);

  return (
    <div className="space-y-8">
      {/* Header with Live City Clock */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.prayer.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t.prayer.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#121720] px-4 py-3">
          <div>
            <div className="text-xs text-slate-400">
              {city.name}, {city.country} · {formattedDate}
            </div>
            <div dir="ltr" className="font-mono-tabular text-2xl font-bold text-white">
              {formattedTimeWithSeconds}
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden="true" />
          <div>
            <div className="text-xs text-slate-400">{t.prayer.activeTimeZone}</div>
            <div dir="ltr" className="font-mono-tabular text-sm font-semibold text-[#F5B942]">
              {formatUtcOffsetLabel(effectiveOffsetHours)}
              {manualOffsetMinutes !== 0 && (
                <span className="ms-1.5 text-xs text-slate-300">
                  ({manualOffsetMinutes > 0 ? `+${manualOffsetMinutes}m` : `${manualOffsetMinutes}m`})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Daily Prayer Cards with Alert Mode Toggles */}
      <section aria-label={t.prayer.todaysSchedule} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-white">
            {t.prayer.todaysSchedule} · {t.prayer.next}: {t.prayer.names[nextPrayer.name]} ({t.status.inPrefix}{' '}
            <span dir="ltr" className="font-mono-tabular text-[#F5B942]">{nextPrayer.countdownFormatted}</span>)
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onTriggerAdhan(nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name, false)}
              className="tv-focus rounded-lg bg-[#D99B38] px-3.5 py-2 text-xs font-semibold text-[#0A0D12] whitespace-nowrap shrink-0 hover:bg-[#F5B942]"
            >
              {t.actions.launchAdhanScreen}
            </button>
            <button
              type="button"
              onClick={() => onTriggerAdhan(nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name, true)}
              className="tv-focus rounded-lg border border-white/15 bg-[#121720] px-3.5 py-2 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 hover:border-[#F5B942] hover:text-[#F5B942]"
            >
              {t.actions.openSupplications}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PRAYER_NAMES.map((prayer) => {
            const isNext = nextPrayer.name === prayer;
            const mode = alertModes[prayer];
            return (
              <div
                key={prayer}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
                  isNext
                    ? 'border-[#F5B942]/70 bg-[#1A212E]'
                    : 'border-white/10 bg-[#121720]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isNext ? 'text-[#F5B942]' : 'text-slate-200'}`}>
                      {t.prayer.names[prayer]}
                    </span>
                    {isNext && (
                      <span className="text-[11px] font-medium text-[#F5B942]">{t.prayer.next}</span>
                    )}
                  </div>
                  <div dir="ltr" className="font-mono-tabular mt-2 text-2xl font-bold text-white">
                    {formatMinutesToHHMM(prayerTimes[prayer])}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                  <button
                    type="button"
                    onClick={() => onTogglePrayerAlert(prayer)}
                    aria-label={`${t.prayer.names[prayer]} alert: ${mode}`}
                    className="tv-focus flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {mode === 'adhan' && <Volume2 className="h-3.5 w-3.5 text-[#F5B942]" />}
                    {mode === 'banner' && <Bell className="h-3.5 w-3.5 text-emerald-400" />}
                    {mode === 'off' && <BellOff className="h-3.5 w-3.5 text-slate-500" />}
                    <span>
                      {mode === 'adhan'
                        ? t.prayer.adhanMode
                        : mode === 'banner'
                          ? t.prayer.bannerMode
                          : t.prayer.offMode}
                    </span>
                  </button>

                  {prayer !== 'Sunrise' && (
                    <button
                      type="button"
                      onClick={() => onTriggerAdhan(prayer, false)}
                      className="tv-focus rounded px-1.5 py-0.5 text-[11px] font-medium text-slate-400 hover:text-[#F5B942]"
                    >
                      {t.prayer.test}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* City Selector & Time Zone Adjustment + Calculation Settings */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Worldwide City Search & Picker */}
        <section aria-label={t.prayer.worldwideCities} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Globe className="h-4 w-4 text-[#F5B942]" />
              <span>{t.prayer.worldwideCities} ({WORLD_CITIES.length})</span>
            </h2>

            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#0A0D12] p-1">
              {(['ALL', 'MENA', 'Europe', 'Americas', 'AsiaPacific'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setRegionFilter(reg)}
                  className={`tv-focus rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    regionFilter === reg
                      ? 'bg-[#D99B38] text-[#0A0D12] font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {reg === 'AsiaPacific' ? 'Asia-Pacific' : reg}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="city-search-input" className="sr-only">
              {t.prayer.searchPlaceholder}
            </label>
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="city-search-input"
              type="text"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              placeholder={t.prayer.searchPlaceholder}
              className="tv-focus w-full rounded-lg border border-white/10 bg-[#0A0D12] py-2.5 ps-9 pe-4 text-sm text-white placeholder:text-slate-500"
            />
          </div>

          {filteredCities.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-white/10 bg-[#0A0D12] p-6 text-center text-sm text-slate-400">
              {t.prayer.noCitiesMatch}
            </div>
          ) : (
            <div className="grid h-[280px] content-start grid-cols-1 gap-2 overflow-y-auto pe-1 sm:grid-cols-2">
              {filteredCities.map((c) => {
                const isSelected = c.id === city.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCity(c.id)}
                    className={`tv-focus flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-start transition-colors ${
                      isSelected
                        ? 'border-[#F5B942] bg-[#D99B38]/15 text-white'
                        : 'border-white/[0.08] bg-[#0D1118] text-slate-200 hover:border-white/20'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{c.name}</div>
                      <div className="truncate text-xs text-slate-400">
                        {c.country} · {c.ianaTimezone}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="ms-2 shrink-0 text-[11px] font-semibold text-[#F5B942]">
                        {t.prayer.active}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Time Zone Adjustment & Calculation Method */}
        <section aria-label={t.prayer.timezoneAdjustment} className="space-y-5 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-5">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">
              {t.prayer.timezoneAdjustment}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {t.prayer.timezoneSubtitle}
            </p>
          </div>

          {/* Manual Time Zone Offset Controls */}
          <div className="space-y-2.5 rounded-lg border border-white/10 bg-[#0D1118] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                {t.prayer.manualOffsetLabel}
              </span>
              <span dir="ltr" className="font-mono-tabular text-xs font-semibold text-[#F5B942]">
                {manualOffsetMinutes === 0
                  ? t.prayer.cityNative
                  : `${manualOffsetMinutes > 0 ? '+' : ''}${manualOffsetMinutes} min`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[-60, -30, 30, 60].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => onChangeManualOffset(manualOffsetMinutes + delta)}
                  className="tv-focus rounded-md border border-white/10 bg-[#151C28] px-3 py-1.5 font-mono-tabular text-xs font-medium text-slate-200 hover:border-[#F5B942] hover:text-[#F5B942]"
                >
                  {delta > 0 ? `+${delta}m` : `${delta}m`}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onChangeManualOffset(0)}
                disabled={manualOffsetMinutes === 0}
                className="tv-focus ms-auto flex items-center gap-1 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{t.actions.reset}</span>
              </button>
            </div>
          </div>

          {/* Calculation Method */}
          <div className="space-y-2">
            <label htmlFor="calc-method-select" className="block text-xs font-medium text-slate-300">
              {t.prayer.calculationAuthority}
            </label>
            <select
              id="calc-method-select"
              value={methodId}
              onChange={(e) => onChangeMethod(e.target.value as CalculationMethodId)}
              className="tv-focus w-full rounded-lg border border-white/10 bg-[#0A0D12] px-3 py-2.5 text-sm text-white"
            >
              {Object.values(CALCULATION_METHODS).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Asr Juristic Method */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-slate-300">
              {t.prayer.asrMethod}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['Standard', 'Hanafi'] as const).map((school) => (
                <button
                  key={school}
                  type="button"
                  onClick={() => onChangeAsrSchool(school)}
                  className={`tv-focus rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    asrSchool === school
                      ? 'border-[#F5B942] bg-[#D99B38]/20 text-[#F5B942]'
                      : 'border-white/10 bg-[#0D1118] text-slate-300 hover:border-white/25'
                  }`}
                >
                  {school === 'Standard' ? t.prayer.standardAsr : t.prayer.hanafiAsr}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Islamic Adhan Backgrounds & Post-Adhan Supplications Preview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section aria-label={t.prayer.adhanBackgrounds} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <ImageIcon className="h-4 w-4 text-[#F5B942]" />
              <span>{t.prayer.adhanBackgrounds}</span>
            </h2>
            <span className="text-xs text-slate-400">{t.prayer.adhanBackgroundsNote}</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ADHAN_BACKGROUNDS.map((bg) => {
              const isSelected = bg.id === selectedBackground.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => onSelectBackground(bg.id)}
                  className={`tv-focus group relative overflow-hidden rounded-xl border text-start transition-all ${
                    isSelected
                      ? 'border-[#F5B942] ring-1 ring-[#F5B942]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-video w-full overflow-hidden bg-[#0A0D12]">
                    <img
                      src={bg.imageUrl}
                      alt={bg.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{bg.title}</span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-[#F5B942]">{t.prayer.active}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-300">{bg.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section aria-label={t.prayer.postAdhanSupplications} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-white">
              {t.prayer.postAdhanSupplications}
            </h2>
            <button
              type="button"
              onClick={() => onTriggerAdhan(nextPrayer.name === 'Sunrise' ? 'Dhuhr' : nextPrayer.name, true)}
              className="tv-focus text-xs font-medium text-[#F5B942] hover:underline whitespace-nowrap shrink-0"
            >
              {t.prayer.fullScreenView}
            </button>
          </div>

          <div className="space-y-4 divide-y divide-white/[0.07]">
            {POST_ADHAN_SUPPLICATIONS.map((dua) => (
              <div key={dua.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-medium text-slate-200">{dua.title}</span>
                  <span>{dua.source}</span>
                </div>
                <p className="font-arabic text-right text-xl leading-loose text-[#FDE68A]">
                  {dua.arabic}
                </p>
                <p className="text-xs italic text-slate-300">{dua.transliteration}</p>
                <p className="text-xs leading-relaxed text-slate-400">{dua.translation}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
