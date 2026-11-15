export type GeoRegion = 'GLOBAL' | 'MENA' | 'EUROPE' | 'AMERICAS' | 'ASIAPACIFIC';

export interface ShieldRules {
  blockNetflixPromos: boolean;
  blockPrimeVideoPromos: boolean;
  blockHomeRecommendations: boolean;
  stripTrackingTelemetry: boolean;
}

export interface TvAppItem {
  id: string;
  name: string;
  packageName: string;
  category: 'Streaming' | 'Live TV' | 'Sports' | 'Media' | 'Audio';
  accentHex: string;
  shortCode: string;
  adFreeWrapper: boolean;
  allowedRegions: GeoRegion[];
  deepLinkIntent: string;
  description: string;
  pinnedOnHome: boolean;
}

export interface FeedRowCandidate {
  id: string;
  source: 'netflix-promo' | 'prime-promo' | 'home-sponsored' | 'editorial';
  title: string;
  region: GeoRegion;
  blockedReason: string;
}

export const GEO_REGIONS: { id: GeoRegion; label: string; summary: string }[] = [
  { id: 'MENA', label: 'Middle East & North Africa', summary: 'Regional channels, SSC & beIN MENA, clean streaming' },
  { id: 'EUROPE', label: 'Europe (UK / EU)', summary: 'European broadcast rights & regional live channels' },
  { id: 'AMERICAS', label: 'North America', summary: 'US/CA sports feeds & regional broadcast apps' },
  { id: 'ASIAPACIFIC', label: 'Asia-Pacific', summary: 'APAC live feeds & regional streaming gateways' },
  { id: 'GLOBAL', label: 'Global (Unrestricted)', summary: 'All non-sponsored launcher feeds enabled' },
];

export const DEFAULT_SHIELD_RULES: ShieldRules = {
  blockNetflixPromos: true,
  blockPrimeVideoPromos: true,
  blockHomeRecommendations: true,
  stripTrackingTelemetry: true,
};

export const INSTALLED_TV_APPS: TvAppItem[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    packageName: 'com.netflix.ninja',
    category: 'Streaming',
    accentHex: '#E50914',
    shortCode: 'NF',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=com.netflix.ninja;S.suppress_hero_promos=true;end',
    description: 'Direct profile launch with home-screen hero ads & auto-trailers stripped.',
    pinnedOnHome: true,
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    packageName: 'com.amazon.amazonvideo.livingroom',
    category: 'Streaming',
    accentHex: '#00A8E1',
    shortCode: 'PV',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=com.amazon.amazonvideo.livingroom;S.hide_storefront_ads=true;end',
    description: 'Opens straight to My Stuff library without sponsored Prime storefront rows.',
    pinnedOnHome: true,
  },
  {
    id: 'youtube-clean',
    name: 'SmartTube TV',
    packageName: 'com.teamsmart.videomanager.tv',
    category: 'Streaming',
    accentHex: '#EF4444',
    shortCode: 'YT',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=com.teamsmart.videomanager.tv;end',
    description: 'Ad-free 4K HDR playback with SponsorBlock integration.',
    pinnedOnHome: true,
  },
  {
    id: 'bein-connect',
    name: 'beIN Connect',
    packageName: 'ptv.bein.mena',
    category: 'Sports',
    accentHex: '#7C3AED',
    shortCode: 'bN',
    adFreeWrapper: true,
    allowedRegions: ['MENA', 'EUROPE'],
    deepLinkIntent: 'intent:#Intent;package=ptv.bein.mena;end',
    description: 'Live football, Champions League & regional sports broadcasts.',
    pinnedOnHome: true,
  },
  {
    id: 'shahid',
    name: 'Shahid TV',
    packageName: 'net.mbc.shahid.tv',
    category: 'Live TV',
    accentHex: '#10B981',
    shortCode: 'SH',
    adFreeWrapper: true,
    allowedRegions: ['MENA'],
    deepLinkIntent: 'intent:#Intent;package=net.mbc.shahid.tv;end',
    description: 'Arabic live channels, SSC Sports & regional series.',
    pinnedOnHome: true,
  },
  {
    id: 'plex',
    name: 'Plex Media',
    packageName: 'com.plexapp.android',
    category: 'Media',
    accentHex: '#E5A00D',
    shortCode: 'PX',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=com.plexapp.android;S.local_only=true;end',
    description: 'Local NAS library only; Plex FAST ad-supported channels hidden.',
    pinnedOnHome: true,
  },
  {
    id: 'kodi',
    name: 'Kodi',
    packageName: 'org.xbmc.kodi',
    category: 'Media',
    accentHex: '#3B82F6',
    shortCode: 'KD',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=org.xbmc.kodi;end',
    description: 'Local home theater player and PVR live TV client.',
    pinnedOnHome: true,
  },
  {
    id: 'quran-audio',
    name: 'Quran TV Audio',
    packageName: 'org.mihrab.qurantv',
    category: 'Audio',
    accentHex: '#D99B38',
    shortCode: 'QR',
    adFreeWrapper: true,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    deepLinkIntent: 'intent:#Intent;package=org.mihrab.qurantv;end',
    description: 'Continuous Makkah & Madinah recitations with zero interruptions.',
    pinnedOnHome: true,
  },
];

/**
 * Simulated upstream launcher feed payload containing promotional Netflix & Prime Video
 * banners that the launcher's ad-free engine intercepts and removes before rendering.
 */
export const UPSTREAM_LAUNCHER_FEED: FeedRowCandidate[] = [
  {
    id: 'ad-nf-1',
    source: 'netflix-promo',
    title: 'Netflix Sponsored Hero: New Original Series Trailer Carousel',
    region: 'GLOBAL',
    blockedReason: 'Netflix Home Banner & Auto-Play Promo Stripped',
  },
  {
    id: 'ad-nf-2',
    source: 'netflix-promo',
    title: 'Netflix "Top Picks For You" Paid Launcher Row',
    region: 'GLOBAL',
    blockedReason: 'Netflix Promotional Shelf Blocked',
  },
  {
    id: 'ad-pv-1',
    source: 'prime-promo',
    title: 'Prime Video Sponsored Storefront: Rent or Buy Blockbusters',
    region: 'GLOBAL',
    blockedReason: 'Prime Video Storefront Ad Row Stripped',
  },
  {
    id: 'ad-pv-2',
    source: 'prime-promo',
    title: 'Amazon Freevee / Prime Channels Upsell Banner',
    region: 'AMERICAS',
    blockedReason: 'Prime Video Promotional Upsell Blocked',
  },
  {
    id: 'ad-rec-1',
    source: 'home-sponsored',
    title: 'Android TV Google Play Movies Featured Rental Strip',
    region: 'GLOBAL',
    blockedReason: 'System Home Recommendation Ad Stripped',
  },
  {
    id: 'ad-rec-2',
    source: 'home-sponsored',
    title: 'Partner App Discovery Sponsored Tile',
    region: 'EUROPE',
    blockedReason: 'Sponsored Partner Tile Blocked',
  },
];

export function evaluateFeedShield(
  candidates: FeedRowCandidate[],
  rules: ShieldRules,
  activeRegion: GeoRegion
): {
  visibleItems: FeedRowCandidate[];
  blockedItems: FeedRowCandidate[];
} {
  const visibleItems: FeedRowCandidate[] = [];
  const blockedItems: FeedRowCandidate[] = [];

  for (const item of candidates) {
    const isNetflixBlocked = item.source === 'netflix-promo' && rules.blockNetflixPromos;
    const isPrimeBlocked = item.source === 'prime-promo' && rules.blockPrimeVideoPromos;
    const isHomeRecBlocked = item.source === 'home-sponsored' && rules.blockHomeRecommendations;
    const isGeoBlocked =
      activeRegion !== 'GLOBAL' && item.region !== 'GLOBAL' && item.region !== activeRegion;

    if (isNetflixBlocked || isPrimeBlocked || isHomeRecBlocked || isGeoBlocked) {
      blockedItems.push(item);
    } else {
      visibleItems.push(item);
    }
  }

  return { visibleItems, blockedItems };
}

export function isAppPermittedInRegion(app: TvAppItem, activeRegion: GeoRegion): boolean {
  if (activeRegion === 'GLOBAL') return true;
  return app.allowedRegions.includes(activeRegion);
}
