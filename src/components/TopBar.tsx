import type { Translations } from '../utils/i18n';

export type LauncherTab = 'home' | 'sports' | 'prayer' | 'livetv' | 'apps';

interface TopBarProps {
  activeTab: LauncherTab;
  t: Translations;
  onSelectTab: (tab: LauncherTab) => void;
  onPreviewAdhan: () => void;
}

export function TopBar({ activeTab, t, onSelectTab, onPreviewAdhan }: TopBarProps) {
  const navItems: { id: LauncherTab; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'sports', label: t.nav.sports },
    { id: 'prayer', label: t.nav.prayer },
    { id: 'livetv', label: t.nav.livetv },
    { id: 'apps', label: t.nav.apps },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0A0D12]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Title */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="tv-focus font-display text-xl font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 rounded-md px-1 py-0.5 transition-colors hover:text-[#F5B942]"
        >
          {t.brandName}
        </button>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Launcher sections" className="flex items-center gap-6 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`tv-focus relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#F5B942]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[#F5B942]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onPreviewAdhan}
            className="tv-focus rounded-lg bg-[#D99B38] px-4 py-2 text-xs font-semibold text-[#0A0D12] whitespace-nowrap shrink-0 transition-colors hover:bg-[#F5B942]"
          >
            {t.actions.previewAdhan}
          </button>
        </div>
      </div>
    </header>
  );
}
