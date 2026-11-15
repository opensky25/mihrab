import { ShieldCheck, Lock, CheckCircle2, ExternalLink, Languages } from 'lucide-react';
import {
  GEO_REGIONS,
  isAppPermittedInRegion,
  type FeedRowCandidate,
  type GeoRegion,
  type ShieldRules,
  type TvAppItem,
} from '../utils/launcherShield';
import {
  SUPPORTED_LANGUAGES,
  type LanguageCode,
  type Translations,
} from '../utils/i18n';

interface AppsShieldViewProps {
  apps: TvAppItem[];
  shieldRules: ShieldRules;
  activeRegion: GeoRegion;
  blockedItems: FeedRowCandidate[];
  language: LanguageCode;
  t: Translations;
  onChangeLanguage: (lang: LanguageCode) => void;
  onToggleRule: (key: keyof ShieldRules) => void;
  onChangeRegion: (region: GeoRegion) => void;
  onLaunchApp: (app: TvAppItem) => void;
  onTogglePinApp: (appId: string) => void;
}

export function AppsShieldView({
  apps,
  shieldRules,
  activeRegion,
  blockedItems,
  language,
  t,
  onChangeLanguage,
  onToggleRule,
  onChangeRegion,
  onLaunchApp,
  onTogglePinApp,
}: AppsShieldViewProps) {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t.settings.title}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Multi-Language Setting */}
      <section aria-label={t.settings.languageTitle} className="rounded-xl border border-white/10 bg-[#121720] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Languages className="h-4 w-4 text-[#F5B942]" />
              <span>{t.settings.languageTitle}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {t.settings.languageDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onChangeLanguage(lang.code)}
                  aria-pressed={isSelected}
                  className={`tv-focus flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-start transition-colors ${
                    isSelected
                      ? 'border-[#F5B942] bg-[#D99B38]/15 text-white'
                      : 'border-white/10 bg-[#0D1118] text-slate-200 hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{lang.nativeName}</div>
                    <div className="text-[11px] text-slate-400">
                      {lang.englishName} · {lang.direction.toUpperCase()}
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-[#F5B942] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shield Rules + Geo-Restriction Region */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Ad-Free Rules */}
        <section aria-label={t.settings.adFreeRulesTitle} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{t.settings.adFreeRulesTitle}</span>
            </h2>
            <span className="font-mono-tabular text-xs font-semibold text-emerald-400">
              {blockedItems.length} {t.settings.blockedBadge}
            </span>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {(
              [
                {
                  key: 'blockNetflixPromos',
                  label: t.settings.ruleNetflixLabel,
                  desc: t.settings.ruleNetflixDesc,
                },
                {
                  key: 'blockPrimeVideoPromos',
                  label: t.settings.rulePrimeLabel,
                  desc: t.settings.rulePrimeDesc,
                },
                {
                  key: 'blockHomeRecommendations',
                  label: t.settings.ruleHomeRecLabel,
                  desc: t.settings.ruleHomeRecDesc,
                },
                {
                  key: 'stripTrackingTelemetry',
                  label: t.settings.ruleTelemetryLabel,
                  desc: t.settings.ruleTelemetryDesc,
                },
              ] as const
            ).map((rule) => {
              const enabled = shieldRules[rule.key];
              return (
                <div key={rule.key} className="flex items-start justify-between gap-4 py-3.5 first:pt-1 last:pb-1">
                  <div>
                    <div className="text-sm font-medium text-white">{rule.label}</div>
                    <p className="mt-0.5 text-xs text-slate-400">{rule.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    onClick={() => onToggleRule(rule.key)}
                    className={`tv-focus shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      enabled
                        ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                        : 'border-white/15 bg-[#0A0D12] text-slate-400'
                    }`}
                  >
                    {enabled ? t.settings.enabled : t.settings.disabled}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Geo-Restriction Policy & Blocked Log */}
        <section aria-label={t.settings.geoRegionTitle} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6 xl:col-span-6">
          <h2 className="font-display text-lg font-semibold text-white">
            {t.settings.geoRegionTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {t.settings.geoRegionDesc}
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {GEO_REGIONS.map((reg) => {
              const isSelected = reg.id === activeRegion;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => onChangeRegion(reg.id)}
                  className={`tv-focus rounded-lg border p-3 text-start transition-colors ${
                    isSelected
                      ? 'border-[#F5B942] bg-[#D99B38]/15'
                      : 'border-white/10 bg-[#0D1118] hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{reg.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-[#F5B942] shrink-0" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{reg.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-xs font-semibold text-slate-300">
              {t.settings.interceptedTitle} ({blockedItems.length})
            </div>
            <div className="mt-2 max-h-[160px] space-y-1.5 overflow-y-auto pe-1">
              {blockedItems.length === 0 ? (
                <p className="text-xs text-slate-500">{t.settings.noBlockedRows}</p>
              ) : (
                blockedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-[#0A0D12] px-3 py-2 text-xs"
                  >
                    <span className="truncate text-slate-300">{item.title}</span>
                    <span className="shrink-0 font-medium text-emerald-400">
                      {t.settings.blockedTag}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Installed TV Apps Directory */}
      <section aria-label={t.settings.installedAppsTitle} className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-white">
          {t.settings.installedAppsTitle}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {apps.map((app) => {
            const permitted = isAppPermittedInRegion(app, activeRegion);
            return (
              <div
                key={app.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121720] p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                        style={{ backgroundColor: app.accentHex }}
                      >
                        {app.shortCode}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{app.name}</div>
                        <div dir="ltr" className="font-mono-tabular text-[11px] text-slate-400">
                          {app.packageName}
                        </div>
                      </div>
                    </div>
                    {!permitted && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400">
                        <Lock className="h-3 w-3" />
                        {t.settings.lockedTag}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {app.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                  <button
                    type="button"
                    onClick={() => onTogglePinApp(app.id)}
                    className="tv-focus text-xs font-medium text-slate-400 hover:text-white"
                  >
                    {app.pinnedOnHome ? t.actions.pinnedToHome : t.actions.pinToHome}
                  </button>
                  <button
                    type="button"
                    onClick={() => onLaunchApp(app)}
                    className="tv-focus flex items-center gap-1.5 rounded-lg bg-[#D99B38] px-3 py-1.5 text-xs font-semibold text-[#0A0D12] hover:bg-[#F5B942]"
                  >
                    <span>{permitted ? t.actions.launch : t.actions.inspect}</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
