export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export type CalculationMethodId =
  | 'UmmAlQura'
  | 'MWL'
  | 'ISNA'
  | 'Egyptian'
  | 'Karachi';

export type AsrSchool = 'Standard' | 'Hanafi';

export type PrayerAlertMode = 'adhan' | 'banner' | 'off';

export interface CityInfo {
  id: string;
  name: string;
  country: string;
  region: 'MENA' | 'Europe' | 'Americas' | 'AsiaPacific';
  latitude: number;
  longitude: number;
  ianaTimezone: string;
}

export interface CalculationMethodConfig {
  id: CalculationMethodId;
  label: string;
  fajrAngle: number;
  ishaAngle?: number;
  ishaMinutesAfterMaghrib?: number;
}

export interface DailyPrayerTimes {
  Fajr: number; // minutes from midnight [0, 1440)
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Isha: number;
}

export interface NextPrayerInfo {
  name: PrayerName;
  timeMinutes: number;
  formattedTime: string;
  countdownSeconds: number;
  countdownFormatted: string;
  isTomorrow: boolean;
}

export interface PrayerIntervalProgress {
  previousName: PrayerName;
  previousTimeFormatted: string;
  nextName: PrayerName;
  nextTimeFormatted: string;
  intervalSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  countdownFormatted: string;
  progress: number;
  isTomorrow: boolean;
}

export interface AdhanBackground {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  accentColor: string;
}

export interface SupplicationItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
}

export interface AdhanPhrase {
  arabic: string;
  transliteration: string;
  translation: string;
}

export const CALCULATION_METHODS: Record<CalculationMethodId, CalculationMethodConfig> = {
  UmmAlQura: {
    id: 'UmmAlQura',
    label: 'Umm al-Qura (Makkah)',
    fajrAngle: 18.5,
    ishaMinutesAfterMaghrib: 90,
  },
  MWL: {
    id: 'MWL',
    label: 'Muslim World League',
    fajrAngle: 18.0,
    ishaAngle: 17.0,
  },
  ISNA: {
    id: 'ISNA',
    label: 'ISNA (North America)',
    fajrAngle: 15.0,
    ishaAngle: 15.0,
  },
  Egyptian: {
    id: 'Egyptian',
    label: 'Egyptian General Authority',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
  },
  Karachi: {
    id: 'Karachi',
    label: 'Univ. of Islamic Sciences, Karachi',
    fajrAngle: 18.0,
    ishaAngle: 18.0,
  },
};

export const WORLD_CITIES: CityInfo[] = [
  { id: 'makkah', name: 'Makkah', country: 'Saudi Arabia', region: 'MENA', latitude: 21.4225, longitude: 39.8262, ianaTimezone: 'Asia/Riyadh' },
  { id: 'madinah', name: 'Madinah', country: 'Saudi Arabia', region: 'MENA', latitude: 24.4672, longitude: 39.6112, ianaTimezone: 'Asia/Riyadh' },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', region: 'MENA', latitude: 24.7136, longitude: 46.6753, ianaTimezone: 'Asia/Riyadh' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', region: 'MENA', latitude: 25.2048, longitude: 55.2708, ianaTimezone: 'Asia/Dubai' },
  { id: 'doha', name: 'Doha', country: 'Qatar', region: 'MENA', latitude: 25.2854, longitude: 51.531, ianaTimezone: 'Asia/Qatar' },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', region: 'MENA', latitude: 30.0444, longitude: 31.2357, ianaTimezone: 'Africa/Cairo' },
  { id: 'amman', name: 'Amman', country: 'Jordan', region: 'MENA', latitude: 31.9454, longitude: 35.9284, ianaTimezone: 'Asia/Amman' },
  { id: 'casablanca', name: 'Casablanca', country: 'Morocco', region: 'MENA', latitude: 33.5731, longitude: -7.5898, ianaTimezone: 'Africa/Casablanca' },
  { id: 'algiers', name: 'Algiers', country: 'Algeria', region: 'MENA', latitude: 36.7538, longitude: 3.0588, ianaTimezone: 'Africa/Algiers' },
  { id: 'tunis', name: 'Tunis', country: 'Tunisia', region: 'MENA', latitude: 36.8065, longitude: 10.1815, ianaTimezone: 'Africa/Tunis' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', region: 'Europe', latitude: 41.0082, longitude: 28.9784, ianaTimezone: 'Europe/Istanbul' },
  { id: 'london', name: 'London', country: 'United Kingdom', region: 'Europe', latitude: 51.5074, longitude: -0.1278, ianaTimezone: 'Europe/London' },
  { id: 'paris', name: 'Paris', country: 'France', region: 'Europe', latitude: 48.8566, longitude: 2.3522, ianaTimezone: 'Europe/Paris' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', region: 'Europe', latitude: 52.52, longitude: 13.405, ianaTimezone: 'Europe/Berlin' },
  { id: 'sarajevo', name: 'Sarajevo', country: 'Bosnia & Herzegovina', region: 'Europe', latitude: 43.8563, longitude: 18.4131, ianaTimezone: 'Europe/Sarajevo' },
  { id: 'new-york', name: 'New York', country: 'United States', region: 'Americas', latitude: 40.7128, longitude: -74.006, ianaTimezone: 'America/New_York' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', region: 'Americas', latitude: 43.6532, longitude: -79.3832, ianaTimezone: 'America/Toronto' },
  { id: 'chicago', name: 'Chicago', country: 'United States', region: 'Americas', latitude: 41.8781, longitude: -87.6298, ianaTimezone: 'America/Chicago' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', region: 'Americas', latitude: 34.0522, longitude: -118.2437, ianaTimezone: 'America/Los_Angeles' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', region: 'AsiaPacific', latitude: 3.139, longitude: 101.6869, ianaTimezone: 'Asia/Kuala_Lumpur' },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', region: 'AsiaPacific', latitude: -6.2088, longitude: 106.8456, ianaTimezone: 'Asia/Jakarta' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', region: 'AsiaPacific', latitude: 1.3521, longitude: 103.8198, ianaTimezone: 'Asia/Singapore' },
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', region: 'AsiaPacific', latitude: 24.8607, longitude: 67.0011, ianaTimezone: 'Asia/Karachi' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', region: 'AsiaPacific', latitude: 35.6762, longitude: 139.6503, ianaTimezone: 'Asia/Tokyo' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', region: 'AsiaPacific', latitude: -33.8688, longitude: 151.2093, ianaTimezone: 'Australia/Sydney' },
];

export const ADHAN_BACKGROUNDS: AdhanBackground[] = [
  {
    id: 'masjid-courtyard',
    title: 'Grand Marble Courtyard',
    subtitle: 'Lantern-lit sanctuary under twilight sky',
    imageUrl: '/src/assets/images/adhan_masjid_haram_1794748790170.jpg',
    accentColor: '#D99B38',
  },
  {
    id: 'emerald-mashrabiya',
    title: 'Emerald & Brass Mashrabiya',
    subtitle: 'Traditional geometric star lattice in warm dusk',
    imageUrl: '/src/assets/images/adhan_islamic_geometry_1794748790152.jpg',
    accentColor: '#10B981',
  },
  {
    id: 'andalusian-arch',
    title: 'Andalusian Courtyard',
    subtitle: 'Carved horseshoe arches & reflecting pool',
    imageUrl: '/src/assets/images/adhan_andalusian_arch_1794748789682.jpg',
    accentColor: '#F59E0B',
  },
  {
    id: 'dawn-minaret',
    title: 'Fajr Dawn Horizon',
    subtitle: 'Classical dome and minaret at first light',
    imageUrl: '/src/assets/images/adhan_dawn_minaret_1794748790565.jpg',
    accentColor: '#60A5FA',
  },
];

export const ADHAN_PHRASES: AdhanPhrase[] = [
  {
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar, Allahu Akbar',
    translation: 'Allah is the Greatest, Allah is the Greatest',
  },
  {
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'Ash-hadu an la ilaha illa Allah',
    translation: 'I bear witness that there is no deity worthy of worship except Allah',
  },
  {
    arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    transliteration: 'Ash-hadu anna Muhammadan Rasul Allah',
    translation: 'I bear witness that Muhammad is the Messenger of Allah',
  },
  {
    arabic: 'حَيَّ عَلَى الصَّلَاةِ ، حَيَّ عَلَى الْفَلَاحِ',
    transliteration: 'Hayya ala as-Salah, Hayya ala al-Falah',
    translation: 'Hasten to the prayer, hasten to true success',
  },
  {
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ ، لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'Allahu Akbar, Allahu Akbar, La ilaha illa Allah',
    translation: 'Allah is the Greatest, there is no deity except Allah',
  },
];

export const POST_ADHAN_SUPPLICATIONS: SupplicationItem[] = [
  {
    id: 'dua-wasilah',
    title: 'Primary Supplication After the Adhan',
    arabic:
      'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration:
      'Allahumma Rabba hadhihi ad-da‘wati at-tammah, was-salati al-qa’imah, ati Muhammadan al-wasilata wal-fadilah, wab‘ath-hu maqaman mahmudan alladhi wa‘adtah.',
    translation:
      'O Allah, Lord of this perfect call and established prayer, grant Muhammad the station of intercession and eminence, and raise him to the praised station that You have promised him.',
    source: 'Sahih al-Bukhari 614',
  },
  {
    id: 'dua-rida',
    title: 'Affirmation of Faith (At the Tashahhud)',
    arabic:
      'رَضِيتُ بِاللَّهِ رَبًّا، وَبِمُحَمَّدٍ رَسُولًا، وَبِالْإِسْلَامِ دِينًا',
    transliteration:
      'Raditu billahi Rabban, wa bi-Muhammadin Rasulan, wa bil-Islami dinan.',
    translation:
      'I am pleased with Allah as my Lord, with Muhammad as Messenger, and with Islam as my way of life.',
    source: 'Sahih Muslim 386',
  },
  {
    id: 'dua-iqamah-window',
    title: 'Supplication Between Adhan & Iqamah',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    transliteration:
      'Allahumma inni as’aluka al-‘afwa wal-‘afiyata fid-dunya wal-akhirah.',
    translation:
      'O Allah, I ask You for pardon and well-being in this world and in the Hereafter. (Supplication made between the Adhan and Iqamah is not rejected.)',
    source: 'Sunan Abi Dawud 521 / At-Tirmidhi 3594',
  },
];

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function dsin(deg: number): number {
  return Math.sin(deg * DEG_TO_RAD);
}
function dcos(deg: number): number {
  return Math.cos(deg * DEG_TO_RAD);
}
function dtan(deg: number): number {
  return Math.tan(deg * DEG_TO_RAD);
}
function darcsin(x: number): number {
  return Math.asin(Math.max(-1, Math.min(1, x))) * RAD_TO_DEG;
}
function darccos(x: number): number {
  return Math.acos(Math.max(-1, Math.min(1, x))) * RAD_TO_DEG;
}
function darccot(x: number): number {
  return Math.atan(1 / x) * RAD_TO_DEG;
}
function darctan2(y: number, x: number): number {
  return Math.atan2(y, x) * RAD_TO_DEG;
}
function fixAngle(a: number): number {
  const res = a - 360 * Math.floor(a / 360);
  return res < 0 ? res + 360 : res;
}
function fixHour(h: number): number {
  const res = h - 24 * Math.floor(h / 24);
  return res < 0 ? res + 24 : res;
}

function julianDate(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number): { declination: number; eqTime: number } {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.02 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  const eqTime = q / 15 - fixHour(RA);
  const declination = darcsin(dsin(e) * dsin(L));
  return { declination, eqTime };
}

function sunAngleTime(
  angle: number,
  latitude: number,
  declination: number,
  dhuhrHours: number,
  direction: 'ccw' | 'cw'
): number {
  const numerator = -dsin(angle) - dsin(latitude) * dsin(declination);
  const denominator = dcos(latitude) * dcos(declination);
  const ratio = Math.max(-0.999, Math.min(0.999, numerator / denominator));
  const T = darccos(ratio) / 15;
  return dhuhrHours + (direction === 'ccw' ? -T : T);
}

function asrTime(
  shadowFactor: number,
  latitude: number,
  declination: number,
  dhuhrHours: number
): number {
  const angle = -darccot(shadowFactor + dtan(Math.abs(latitude - declination)));
  return sunAngleTime(angle, latitude, declination, dhuhrHours, 'cw');
}

/**
 * Computes IANA timezone offset in hours relative to UTC for a given Date.
 */
export function getIanaTimezoneOffsetHours(ianaTimezone: string, date: Date): number {
  try {
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = date.toLocaleString('en-US', { timeZone: ianaTimezone });
    const utcDate = new Date(utcStr);
    const tzDate = new Date(tzStr);
    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  } catch {
    return 0;
  }
}

/**
 * Returns local calendar date parts (year, month, day, hours, minutes, seconds)
 * for an IANA timezone plus an optional manual offset adjustment in minutes.
 */
export function getCityLocalClock(
  ianaTimezone: string,
  manualOffsetMinutes: number,
  now: Date
): {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
  effectiveOffsetHours: number;
  formattedTime: string;
  formattedTimeWithSeconds: string;
  formattedDate: string;
} {
  const baseOffsetHours = getIanaTimezoneOffsetHours(ianaTimezone, now);
  const effectiveOffsetHours = baseOffsetHours + manualOffsetMinutes / 60;
  const shiftedMs = now.getTime() + effectiveOffsetHours * 3600 * 1000;
  const shifted = new Date(shiftedMs);

  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth() + 1;
  const day = shifted.getUTCDate();
  const hours = shifted.getUTCHours();
  const minutes = shifted.getUTCMinutes();
  const seconds = shifted.getUTCSeconds();

  const pad = (n: number) => String(n).padStart(2, '0');
  const formattedTime = `${pad(hours)}:${pad(minutes)}`;
  const formattedTimeWithSeconds = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const formattedDate = shifted.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    totalMinutes: hours * 60 + minutes,
    effectiveOffsetHours,
    formattedTime,
    formattedTimeWithSeconds,
    formattedDate,
  };
}

export function formatUtcOffsetLabel(offsetHours: number): string {
  const sign = offsetHours >= 0 ? '+' : '-';
  const abs = Math.abs(offsetHours);
  const hrs = Math.floor(abs);
  const mins = Math.round((abs - hrs) * 60);
  return `UTC${sign}${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function formatMinutesToHHMM(totalMinutes: number): string {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Pure astronomical calculation of daily prayer times in minutes since local midnight.
 */
export function calculateDailyPrayerTimes(params: {
  year: number;
  month: number;
  day: number;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number;
  methodId: CalculationMethodId;
  asrSchool: AsrSchool;
}): DailyPrayerTimes {
  const { year, month, day, latitude, longitude, timezoneOffsetHours, methodId, asrSchool } = params;
  const method = CALCULATION_METHODS[methodId];
  const jd = julianDate(year, month, day) - longitude / (15 * 24);
  const { declination, eqTime } = sunPosition(jd + 0.5);

  const dhuhrHours = fixHour(12 + timezoneOffsetHours - longitude / 15 - eqTime);
  const sunriseHours = sunAngleTime(0.833, latitude, declination, dhuhrHours, 'ccw');
  const sunsetHours = sunAngleTime(0.833, latitude, declination, dhuhrHours, 'cw');
  const fajrHours = sunAngleTime(method.fajrAngle, latitude, declination, dhuhrHours, 'ccw');
  const asrHours = asrTime(asrSchool === 'Hanafi' ? 2 : 1, latitude, declination, dhuhrHours);

  const maghribHours = sunsetHours;
  const ishaHours =
    method.ishaMinutesAfterMaghrib !== undefined
      ? maghribHours + method.ishaMinutesAfterMaghrib / 60
      : sunAngleTime(method.ishaAngle ?? 17, latitude, declination, dhuhrHours, 'cw');

  const toMins = (h: number) => Math.round(fixHour(h) * 60);

  return {
    Fajr: toMins(fajrHours),
    Sunrise: toMins(sunriseHours),
    Dhuhr: toMins(dhuhrHours),
    Asr: toMins(asrHours),
    Maghrib: toMins(maghribHours),
    Isha: toMins(ishaHours),
  };
}

export function getNextPrayerInfo(
  times: DailyPrayerTimes,
  currentMinutes: number,
  currentSeconds: number = 0
): NextPrayerInfo {
  const order: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const nowTotalSeconds = currentMinutes * 60 + currentSeconds;

  for (const name of order) {
    const targetSeconds = times[name] * 60;
    if (targetSeconds > nowTotalSeconds) {
      const diff = targetSeconds - nowTotalSeconds;
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      return {
        name,
        timeMinutes: times[name],
        formattedTime: formatMinutesToHHMM(times[name]),
        countdownSeconds: diff,
        countdownFormatted: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
        isTomorrow: false,
      };
    }
  }

  // Wrap around to tomorrow's Fajr
  const tomorrowFajrSeconds = (times.Fajr + 1440) * 60;
  const diff = tomorrowFajrSeconds - nowTotalSeconds;
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  return {
    name: 'Fajr',
    timeMinutes: times.Fajr,
    formattedTime: formatMinutesToHHMM(times.Fajr),
    countdownSeconds: diff,
    countdownFormatted: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
    isTomorrow: true,
  };
}

export function getPrayerIntervalProgress(
  times: DailyPrayerTimes,
  currentMinutes: number,
  currentSeconds: number = 0
): PrayerIntervalProgress {
  const order: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const nowTotalSeconds = currentMinutes * 60 + currentSeconds;

  let previousName: PrayerName = 'Isha';
  let prevSeconds = (times.Isha - 1440) * 60;
  let nextName: PrayerName = 'Fajr';
  let nextSeconds = times.Fajr * 60;
  let isTomorrow = false;

  if (nowTotalSeconds < times.Fajr * 60) {
    previousName = 'Isha';
    prevSeconds = (times.Isha - 1440) * 60;
    nextName = 'Fajr';
    nextSeconds = times.Fajr * 60;
    isTomorrow = false;
  } else if (nowTotalSeconds >= times.Isha * 60) {
    previousName = 'Isha';
    prevSeconds = times.Isha * 60;
    nextName = 'Fajr';
    nextSeconds = (times.Fajr + 1440) * 60;
    isTomorrow = true;
  } else {
    for (let i = 1; i < order.length; i++) {
      const candidate = order[i];
      if (times[candidate] * 60 > nowTotalSeconds) {
        previousName = order[i - 1];
        prevSeconds = times[previousName] * 60;
        nextName = candidate;
        nextSeconds = times[nextName] * 60;
        break;
      }
    }
  }

  const intervalSeconds = Math.max(1, nextSeconds - prevSeconds);
  const remainingSeconds = Math.max(0, nextSeconds - nowTotalSeconds);
  const elapsedSeconds = Math.max(0, Math.min(intervalSeconds, nowTotalSeconds - prevSeconds));
  const progress = Math.max(0, Math.min(1, elapsedSeconds / intervalSeconds));

  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;
  const countdownFormatted = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return {
    previousName,
    previousTimeFormatted: formatMinutesToHHMM(times[previousName]),
    nextName,
    nextTimeFormatted: formatMinutesToHHMM(times[nextName]),
    intervalSeconds,
    elapsedSeconds,
    remainingSeconds,
    countdownFormatted,
    progress,
    isTomorrow,
  };
}
