import { Globe, ShieldCheck, Clock } from 'lucide-react';
import type { CityInfo, NextPrayerInfo } from '../utils/prayerTimes';
import type { GeoRegion } from '../utils/launcherShield';
import { formatUtcOffsetLabel } from '../utils/prayerTimes';
import type { Translations } from '../utils/i18n';

interface StatusStripProps {
  city: CityInfo;
  formattedTime: string;
  formattedDate: string;
  effectiveOffsetHours: number;
  nextPrayer: NextPrayerInfo;
  blockedAdsCount: number;
  activeRegion: GeoRegion;
  t: Translations;
  onOpenPrayerSettings: () => void;
  onOpenShieldSettings: () => void;
}

export function StatusStrip({
  city,
  formattedTime,
  formattedDate,
  effectiveOffsetHours,
  nextPrayer,
  blockedAdsCount,
  activeRegion,
  t,
  onOpenPrayerSettings,
  onOpenShieldSettings,
}: StatusStripProps) {
  return (
    <div className="border-b border-white/[0.07] bg-[#0F141C]">
      <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-6 py-2.5 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onOpenPrayerSettings}
            className="tv-focus flex items-center gap-2 rounded-md px-2 py-1 text-start transition-colors hover:bg-white/5 hover:text-white"
            aria-label={`${t.actions.adjustCityTimezone}: ${city.name}`}
          >
            <Globe className="h-3.5 w-3.5 text-[#F5B942] shrink-0" />
            <span className="font-medium text-slate-100">
              {city.name}, {city.country}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span dir="ltr" className="font-mono-tabular text-slate-400">
              {formatUtcOffsetLabel(effectiveOffsetHours)}
            </span>
          </button>

          <span aria-hidden="true" className="hidden sm:inline text-slate-700">/</span>

          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span dir="ltr" className="font-mono-tabular font-semibold text-slate-100">{formattedTime}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onOpenPrayerSettings}
            className="tv-focus flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-white/5"
          >
            <span className="text-slate-400">{t.status.nextPrayer}:</span>
            <span className="font-semibold text-[#F5B942]">
              {t.prayer.names[nextPrayer.name]}
            </span>
            <span dir="ltr" className="font-mono-tabular text-slate-200">{nextPrayer.formattedTime}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono-tabular text-slate-400">
              {t.status.inPrefix} <span dir="ltr">{nextPrayer.countdownFormatted}</span>
            </span>
          </button>

          <span aria-hidden="true" className="hidden md:inline text-slate-700">/</span>

          <button
            type="button"
            onClick={onOpenShieldSettings}
            className="tv-focus flex items-center gap-1.5 rounded-md px-2 py-1 text-emerald-400 transition-colors hover:bg-white/5"
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>{t.status.adFree}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono-tabular text-slate-300">
              {blockedAdsCount} {t.status.promosBlocked}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{t.status.region}: {activeRegion}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
