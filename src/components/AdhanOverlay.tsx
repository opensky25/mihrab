import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  ADHAN_PHRASES,
  POST_ADHAN_SUPPLICATIONS,
  type AdhanBackground,
  type CityInfo,
  type PrayerName,
} from '../utils/prayerTimes';
import { AdhanTonePlayer } from '../utils/adhanAudio';
import type { Translations } from '../utils/i18n';

interface AdhanOverlayProps {
  prayerName: PrayerName;
  city: CityInfo;
  localTime: string;
  background: AdhanBackground;
  initialPhase: 'adhan' | 'supplications';
  t: Translations;
  onClose: () => void;
}

export function AdhanOverlay({
  prayerName,
  city,
  localTime,
  background,
  initialPhase,
  t,
  onClose,
}: AdhanOverlayProps) {
  const [phase, setPhase] = useState<'adhan' | 'supplications'>(initialPhase);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [duaIndex, setDuaIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const playerRef = useRef<AdhanTonePlayer | null>(null);

  useEffect(() => {
    const player = new AdhanTonePlayer();
    playerRef.current = player;
    if (phase === 'adhan' && audioEnabled) {
      player.playGentleChime();
    }
    return () => {
      player.stop();
    };
  }, [phase, audioEnabled]);

  useEffect(() => {
    if (phase !== 'adhan') return;
    const timer = window.setInterval(() => {
      setPhraseIndex((prev) => {
        if (prev + 1 >= ADHAN_PHRASES.length) {
          setPhase('supplications');
          return prev;
        }
        return prev + 1;
      });
    }, 3500);
    return () => window.clearInterval(timer);
  }, [phase]);

  const currentPhrase = ADHAN_PHRASES[phraseIndex] ?? ADHAN_PHRASES[0];
  const currentDua = POST_ADHAN_SUPPLICATIONS[duaIndex] ?? POST_ADHAN_SUPPLICATIONS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.prayer.names[prayerName]} ${t.adhanOverlay.callToPrayer}`}
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#0A0D12]"
    >
      {/* Full-Screen Islamic Background */}
      <img
        src={background.imageUrl}
        alt={background.title}
        referrerPolicy="no-referrer"
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#0A0D12]/80 via-[#0A0D12]/65 to-[#0A0D12]/90"
      />

      {/* Top Bar inside Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-6">
        <div className="text-sm text-slate-200">
          <span className="font-semibold text-[#F5B942]">
            {t.prayer.names[prayerName]} · {t.adhanOverlay.callToPrayer}
          </span>
          <span aria-hidden="true" className="mx-2 text-slate-500">·</span>
          <span>
            {city.name}, {city.country}
          </span>
          <span aria-hidden="true" className="mx-2 text-slate-500">·</span>
          <span dir="ltr" className="font-mono-tabular">{localTime}</span>
        </div>

        <div className="flex items-center gap-3">
          {phase === 'adhan' && (
            <button
              type="button"
              onClick={() => setAudioEnabled((prev) => !prev)}
              className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm hover:border-[#F5B942]"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 text-[#F5B942]" /> : <VolumeX className="h-4 w-4" />}
              <span>{audioEnabled ? t.adhanOverlay.adhanToneOn : t.adhanOverlay.muted}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.returnToLauncher}
            className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm hover:border-white"
          >
            <X className="h-4 w-4" />
            <span>{t.actions.returnToLauncher}</span>
          </button>
        </div>
      </div>

      {/* Center Content: Phase 1 (Adhan) or Phase 2 (Post-Adhan Supplications) */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[960px] flex-col items-center px-6 py-8 text-center">
        {phase === 'adhan' ? (
          <div className="w-full space-y-8">
            <div className="text-sm font-medium tracking-wide text-[#F5B942]">
              {t.adhanOverlay.callToPrayer} · {background.title}
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#0A0D12]/70 px-6 py-10 backdrop-blur-md sm:px-12">
              <p className="font-arabic text-3xl leading-relaxed text-[#FDE68A] sm:text-5xl">
                {currentPhrase.arabic}
              </p>
              <p className="mt-6 text-lg font-medium text-white sm:text-xl">
                {currentPhrase.transliteration}
              </p>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                {currentPhrase.translation}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {ADHAN_PHRASES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhraseIndex(idx)}
                  aria-label={`Adhan phrase ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === phraseIndex ? 'w-8 bg-[#F5B942]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="text-sm font-medium tracking-wide text-[#F5B942]">
              {t.adhanOverlay.supplicationsHeader} · {currentDua.source}
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#0A0D12]/75 px-6 py-8 backdrop-blur-md sm:px-10">
              <h2 className="font-display text-lg font-semibold text-white">
                {currentDua.title}
              </h2>
              <p className="font-arabic mt-6 text-2xl leading-[2.1] text-[#FDE68A] sm:text-4xl">
                {currentDua.arabic}
              </p>
              <p className="mt-5 text-base italic text-slate-200">
                {currentDua.transliteration}
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                {currentDua.translation}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setDuaIndex((prev) =>
                    prev === 0 ? POST_ADHAN_SUPPLICATIONS.length - 1 : prev - 1
                  )
                }
                className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/50 px-4 py-2 text-xs font-medium text-slate-100 hover:border-[#F5B942]"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                <span>{t.adhanOverlay.previousDua}</span>
              </button>
              <span dir="ltr" className="font-mono-tabular px-2 text-xs text-slate-300">
                {duaIndex + 1} / {POST_ADHAN_SUPPLICATIONS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setDuaIndex((prev) => (prev + 1) % POST_ADHAN_SUPPLICATIONS.length)
                }
                className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/50 px-4 py-2 text-xs font-medium text-slate-100 hover:border-[#F5B942]"
              >
                <span>{t.adhanOverlay.nextDua}</span>
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Mode Switcher */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPhraseIndex(0);
              setPhase('adhan');
            }}
            className={`tv-focus rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              phase === 'adhan'
                ? 'bg-[#D99B38] text-[#0A0D12]'
                : 'border border-white/20 bg-black/50 text-slate-200 hover:border-[#F5B942]'
            }`}
          >
            {t.adhanOverlay.tabAdhan}
          </button>
          <button
            type="button"
            onClick={() => setPhase('supplications')}
            className={`tv-focus rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              phase === 'supplications'
                ? 'bg-[#D99B38] text-[#0A0D12]'
                : 'border border-white/20 bg-black/50 text-slate-200 hover:border-[#F5B942]'
            }`}
          >
            {t.adhanOverlay.tabSupplications}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="tv-focus rounded-lg bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20"
        >
          {t.actions.dismiss}
        </button>
      </div>
    </div>
  );
}
