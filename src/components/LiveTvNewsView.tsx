import { useState } from 'react';
import { Tv, Volume2, VolumeX, Newspaper, Radio } from 'lucide-react';
import {
  NEWS_ARTICLES,
  type LiveChannel,
  type NewsArticle,
} from '../utils/newsAndChannels';
import type { GeoRegion } from '../utils/launcherShield';
import type { Translations } from '../utils/i18n';

interface LiveTvNewsViewProps {
  channels: LiveChannel[];
  activeChannel: LiveChannel;
  activeRegion: GeoRegion;
  t: Translations;
  onSelectChannel: (channel: LiveChannel) => void;
}

export function LiveTvNewsView({
  channels,
  activeChannel,
  activeRegion,
  t,
  onSelectChannel,
}: LiveTvNewsViewProps) {
  const [muted, setMuted] = useState(false);
  const [newsCategory, setNewsCategory] = useState<'All' | NewsArticle['category']>('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle>(NEWS_ARTICLES[0]);

  const filteredNews =
    newsCategory === 'All'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((n) => n.category === newsCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.livetv.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t.livetv.subtitle} · {t.status.region}: {activeRegion}
          </p>
        </div>
        <div className="text-xs text-slate-400">
          {channels.length} {t.livetv.channelsPermitted} {activeRegion}
        </div>
      </div>

      {/* Integrated Channel Player & Channel List */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Player Viewport */}
        <section aria-label={t.livetv.title} className="overflow-hidden rounded-xl border border-white/10 bg-[#121720] xl:col-span-8">
          <div
            className="relative flex aspect-video w-full flex-col justify-between overflow-hidden p-6"
            style={{
              background: `radial-gradient(circle at 25% 25%, ${activeChannel.accentColor}26 0%, #0A0D12 70%)`,
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-tabular rounded-md border border-white/15 bg-black/50 px-2.5 py-1 text-xs font-bold text-white">
                  CH {activeChannel.number}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Radio className="h-3.5 w-3.5" />
                  {t.sports.live} · {activeChannel.quality}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMuted((prev) => !prev)}
                aria-label={muted ? t.livetv.audioOn : t.livetv.muted}
                className="tv-focus flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-[#F5B942] hover:text-[#F5B942]"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{muted ? t.livetv.muted : t.livetv.audioOn}</span>
              </button>
            </div>

            <div className="my-auto py-8 text-center">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-[#121720]/80"
                style={{ color: activeChannel.accentColor }}
              >
                <Tv className="h-8 w-8" />
              </div>
              <h2 className="font-display mt-4 text-2xl font-bold text-white sm:text-3xl">
                {activeChannel.name}
              </h2>
              <p className="mt-1 text-sm text-slate-300">{activeChannel.nowPlaying}</p>
            </div>

            {/* EPG Bar */}
            <div className="space-y-2 rounded-lg border border-white/10 bg-[#0A0D12]/80 p-4 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium text-slate-200">
                  {t.livetv.now}: {activeChannel.nowPlaying}
                </span>
                <span className="text-slate-400">{t.livetv.upNext}: {activeChannel.upNext}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#D99B38] transition-all"
                  style={{ width: `${activeChannel.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Channel Switcher List */}
        <section aria-label={t.livetv.channelGuide} className="space-y-3 rounded-xl border border-white/10 bg-[#121720] p-5 xl:col-span-4">
          <h2 className="font-display text-base font-semibold text-white">
            {t.livetv.channelGuide}
          </h2>
          <div className="max-h-[420px] space-y-2 overflow-y-auto pe-1">
            {channels.map((ch) => {
              const isSelected = ch.id === activeChannel.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onSelectChannel(ch)}
                  className={`tv-focus flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-start transition-colors ${
                    isSelected
                      ? 'border-[#F5B942] bg-[#D99B38]/15'
                      : 'border-white/[0.08] bg-[#0D1118] hover:border-white/25'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono-tabular font-semibold text-slate-300">
                        {ch.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{ch.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ch.language}</span>
                    </div>
                    <div className="mt-0.5 truncate text-sm font-semibold text-white">
                      {ch.name}
                    </div>
                    <div className="truncate text-xs text-slate-400">{ch.nowPlaying}</div>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 text-[11px] font-semibold text-[#F5B942]">
                      {t.livetv.playing}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* News Desk */}
      <section aria-label={t.livetv.newsBriefings} className="space-y-4 rounded-xl border border-white/10 bg-[#121720] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Newspaper className="h-4 w-4 text-[#F5B942]" />
            <span>{t.livetv.newsBriefings}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#0A0D12] p-1">
            {(['All', 'World', 'Middle East', 'Sports', 'Technology'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewsCategory(cat)}
                className={`tv-focus rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  newsCategory === cat
                    ? 'bg-[#D99B38] text-[#0A0D12] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'All' ? t.livetv.allCategories : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="divide-y divide-white/[0.07] lg:col-span-7">
            {filteredNews.map((article) => {
              const isSelected = article.id === selectedArticle.id;
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className={`tv-focus block w-full py-3.5 px-3 text-start transition-colors rounded-lg ${
                    isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium text-[#F5B942]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedAgo}</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {article.headline}
                  </div>
                </button>
              );
            })}
          </div>

          <article className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1118] p-5 lg:col-span-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-[#F5B942]">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.source}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readingTime}</span>
              </div>
              <h3 className="font-display text-lg font-bold leading-snug text-white">
                {selectedArticle.headline}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {selectedArticle.summary}
              </p>
            </div>
            <div className="mt-6 border-t border-white/[0.07] pt-3 text-xs text-slate-400">
              {t.livetv.published} {selectedArticle.publishedAgo} · {t.livetv.adFreeEditorial}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
