import { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, X, ExternalLink } from 'lucide-react';
import {
  isAppPermittedInRegion,
  type GeoRegion,
  type TvAppItem,
} from '../utils/launcherShield';
import type { Translations } from '../utils/i18n';

interface AppLaunchModalProps {
  app: TvAppItem;
  activeRegion: GeoRegion;
  t: Translations;
  onClose: () => void;
}

export function AppLaunchModal({ app, activeRegion, t, onClose }: AppLaunchModalProps) {
  const [launched, setLaunched] = useState(false);
  const permitted = isAppPermittedInRegion(app, activeRegion);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.actions.launch} ${app.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#121720] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-base font-bold text-white"
              style={{ backgroundColor: app.accentHex }}
            >
              {app.shortCode}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">{app.name}</h2>
              <p dir="ltr" className="font-mono-tabular text-xs text-slate-400">{app.packageName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.dismiss}
            className="tv-focus rounded-lg border border-white/10 p-1.5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">{app.description}</p>

        <div className="mt-5 space-y-2.5 rounded-xl border border-white/10 bg-[#0A0D12] p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{t.appModal.geoPolicy} ({activeRegion})</span>
            {permitted ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.appModal.permitted}
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Lock className="h-3.5 w-3.5" />
                {t.appModal.blockedIn} {activeRegion}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">{t.appModal.adStripping}</span>
            <span className="font-semibold text-emerald-400">{t.appModal.activeZeroBanners}</span>
          </div>

          <div className="border-t border-white/[0.07] pt-2.5">
            <div className="text-[11px] text-slate-500">{t.appModal.leanbackIntent}</div>
            <code dir="ltr" className="mt-1 block break-all font-mono-tabular text-[11px] text-slate-300">
              {app.deepLinkIntent}
            </code>
          </div>
        </div>

        {launched && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>
              {t.appModal.launchedNote} {app.name} ({app.packageName}).
            </span>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="tv-focus rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
          >
            {t.actions.backToLauncher}
          </button>

          {permitted && (
            <button
              type="button"
              onClick={() => setLaunched(true)}
              className="tv-focus flex items-center gap-1.5 rounded-lg bg-[#D99B38] px-4 py-2 text-xs font-semibold text-[#0A0D12] hover:bg-[#F5B942]"
            >
              <span>{launched ? t.appModal.launched : `${app.name} · ${t.appModal.launchAdFree}`}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
