import type { GeoRegion } from './launcherShield';

export interface LiveChannel {
  id: string;
  number: string;
  name: string;
  category: 'Sacred' | 'News' | 'Sports' | 'Documentary';
  language: string;
  quality: '4K UHD' | '1080p HD';
  nowPlaying: string;
  upNext: string;
  progressPercent: number;
  allowedRegions: GeoRegion[];
  accentColor: string;
}

export interface NewsArticle {
  id: string;
  category: 'World' | 'Middle East' | 'Sports' | 'Technology';
  source: string;
  publishedAgo: string;
  headline: string;
  summary: string;
  readingTime: string;
}

export const LIVE_CHANNELS: LiveChannel[] = [
  {
    id: 'makkah-live',
    number: '01',
    name: 'Makkah Quran TV',
    category: 'Sacred',
    language: 'Arabic',
    quality: '4K UHD',
    nowPlaying: 'Live Broadcast from Al-Masjid al-Haram',
    upNext: 'Maghrib Prayer & Recitation',
    progressPercent: 72,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    accentColor: '#D99B38',
  },
  {
    id: 'madinah-live',
    number: '02',
    name: 'Madinah Sunnah TV',
    category: 'Sacred',
    language: 'Arabic',
    quality: '4K UHD',
    nowPlaying: 'Live Broadcast from Al-Masjid an-Nabawi',
    upNext: 'Evening Adhkar & Prophetic Hadith',
    progressPercent: 64,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    accentColor: '#10B981',
  },
  {
    id: 'aljazeera-ar',
    number: '03',
    name: 'Al Jazeera Arabic',
    category: 'News',
    language: 'Arabic',
    quality: '1080p HD',
    nowPlaying: 'Al-Hasad — Evening World Bulletin',
    upNext: 'Economic & Regional Analysis',
    progressPercent: 48,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    accentColor: '#F59E0B',
  },
  {
    id: 'aljazeera-en',
    number: '04',
    name: 'Al Jazeera English',
    category: 'News',
    language: 'English',
    quality: '1080p HD',
    nowPlaying: 'Newshour — Global Headlines & Correspondents',
    upNext: 'Inside Story',
    progressPercent: 55,
    allowedRegions: ['GLOBAL', 'MENA', 'EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    accentColor: '#3B82F6',
  },
  {
    id: 'bein-news',
    number: '05',
    name: 'beIN Sports News',
    category: 'Sports',
    language: 'Arabic / English',
    quality: '1080p HD',
    nowPlaying: 'Matchday Live Studio & Tactical Breakdown',
    upNext: 'European & Regional League Highlights',
    progressPercent: 81,
    allowedRegions: ['MENA', 'EUROPE'],
    accentColor: '#8B5CF6',
  },
  {
    id: 'alarabiya',
    number: '06',
    name: 'Al Arabiya',
    category: 'News',
    language: 'Arabic',
    quality: '1080p HD',
    nowPlaying: 'Panorama — Regional & Markets Report',
    upNext: 'Gulf Business Daily',
    progressPercent: 35,
    allowedRegions: ['MENA'],
    accentColor: '#0EA5E9',
  },
  {
    id: 'bloomberg',
    number: '07',
    name: 'Bloomberg Television',
    category: 'News',
    language: 'English',
    quality: '1080p HD',
    nowPlaying: 'Global Markets & Technology Briefing',
    upNext: 'Bloomberg Surveillance',
    progressPercent: 42,
    allowedRegions: ['EUROPE', 'AMERICAS', 'ASIAPACIFIC'],
    accentColor: '#6366F1',
  },
  {
    id: 'natgeo-ad',
    number: '08',
    name: 'National Geographic Abu Dhabi',
    category: 'Documentary',
    language: 'Arabic',
    quality: '1080p HD',
    nowPlaying: 'Engineering Marvels of the Arabian Peninsula',
    upNext: 'Deep Ocean Expeditions',
    progressPercent: 28,
    allowedRegions: ['MENA'],
    accentColor: '#EAB308',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'n1',
    category: 'Sports',
    source: 'beIN Sports Wire',
    publishedAgo: '18m ago',
    headline: 'Title race tightens across Premier League and La Liga ahead of winter fixtures',
    summary:
      'Arsenal and Liverpool remain separated by a single point at the top of the Premier League table while Real Madrid and Barcelona trade momentum in Spain.',
    readingTime: '2 min read',
  },
  {
    id: 'n2',
    category: 'Middle East',
    source: 'Al Jazeera Desk',
    publishedAgo: '42m ago',
    headline: 'High-speed rail and renewable energy corridors expand across Gulf capitals',
    summary:
      'Regional infrastructure ministers confirmed new cross-border grid interconnect milestones and solar storage capacity targets for 2027.',
    readingTime: '3 min read',
  },
  {
    id: 'n3',
    category: 'Technology',
    source: 'Tech Monitor',
    publishedAgo: '1h ago',
    headline: 'Open-source Android TV leanback launchers gain traction for zero-telemetry living rooms',
    summary:
      'Privacy-focused households increasingly adopt local-first launchers that strip sponsored streaming banners and enforce clean home screen navigation.',
    readingTime: '3 min read',
  },
  {
    id: 'n4',
    category: 'World',
    source: 'Global Dispatch',
    publishedAgo: '2h ago',
    headline: 'International aviation hubs adopt synchronized lunar and seasonal travel schedules',
    summary:
      'Major carriers across Europe, MENA, and Southeast Asia expanded direct wide-body routes ahead of peak seasonal demand.',
    readingTime: '2 min read',
  },
  {
    id: 'n5',
    category: 'Sports',
    source: 'SSC Matchday',
    publishedAgo: '3h ago',
    headline: 'Al-Hilal extends unbeaten league run with high-tempo Riyadh derby display',
    summary:
      'Second-half clinical finishing preserved a three-point cushion at the summit of the Saudi Pro League standings.',
    readingTime: '2 min read',
  },
];

export function filterChannelsByRegion(
  channels: LiveChannel[],
  activeRegion: GeoRegion
): LiveChannel[] {
  if (activeRegion === 'GLOBAL') return channels;
  return channels.filter((ch) => ch.allowedRegions.includes(activeRegion));
}
