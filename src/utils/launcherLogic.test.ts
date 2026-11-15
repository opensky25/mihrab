import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDailyPrayerTimes,
  getNextPrayerInfo,
  getPrayerIntervalProgress,
  formatMinutesToHHMM,
  formatUtcOffsetLabel,
  WORLD_CITIES,
} from './prayerTimes';
import {
  filterMatches,
  getSortedStandings,
  SPORTS_MATCHES,
  toggleMatchReminder,
  findApproachingMatchReminders,
} from './sportsData';
import {
  evaluateFeedShield,
  UPSTREAM_LAUNCHER_FEED,
  DEFAULT_SHIELD_RULES,
  INSTALLED_TV_APPS,
  isAppPermittedInRegion,
} from './launcherShield';
import { filterChannelsByRegion, LIVE_CHANNELS } from './newsAndChannels';
import { SUPPORTED_LANGUAGES, TRANSLATIONS, getLanguageOption, getTranslations } from './i18n';
import {
  convertCelsius,
  getCityFallbackWeather,
  mapWmoCodeToCondition,
} from './weather';

test('calculateDailyPrayerTimes produces strictly ordered daily prayers for Makkah', () => {
  const makkah = WORLD_CITIES.find((c) => c.id === 'makkah')!;
  const times = calculateDailyPrayerTimes({
    year: 2026,
    month: 11,
    day: 15,
    latitude: makkah.latitude,
    longitude: makkah.longitude,
    timezoneOffsetHours: 3,
    methodId: 'UmmAlQura',
    asrSchool: 'Standard',
  });

  assert.ok(times.Fajr < times.Sunrise, 'Fajr must precede Sunrise');
  assert.ok(times.Sunrise < times.Dhuhr, 'Sunrise must precede Dhuhr');
  assert.ok(times.Dhuhr < times.Asr, 'Dhuhr must precede Asr');
  assert.ok(times.Asr < times.Maghrib, 'Asr must precede Maghrib');
  assert.ok(times.Maghrib < times.Isha, 'Maghrib must precede Isha');
  // Umm al-Qura sets Isha 90 minutes after Maghrib
  assert.equal(times.Isha - times.Maghrib, 90);
});

test('calculateDailyPrayerTimes shifts accurately with manual timezone offset adjustment', () => {
  const london = WORLD_CITIES.find((c) => c.id === 'london')!;
  const utc0 = calculateDailyPrayerTimes({
    year: 2026,
    month: 6,
    day: 15,
    latitude: london.latitude,
    longitude: london.longitude,
    timezoneOffsetHours: 0,
    methodId: 'MWL',
    asrSchool: 'Standard',
  });
  const utcPlus1 = calculateDailyPrayerTimes({
    year: 2026,
    month: 6,
    day: 15,
    latitude: london.latitude,
    longitude: london.longitude,
    timezoneOffsetHours: 1,
    methodId: 'MWL',
    asrSchool: 'Standard',
  });

  assert.equal(utcPlus1.Dhuhr - utc0.Dhuhr, 60);
  assert.equal(utcPlus1.Maghrib - utc0.Maghrib, 60);
});

test('getNextPrayerInfo wraps around to Fajr after Isha', () => {
  const sample = {
    Fajr: 300, // 05:00
    Sunrise: 380,
    Dhuhr: 730,
    Asr: 940,
    Maghrib: 1080,
    Isha: 1170, // 19:30
  };
  const nextAtNight = getNextPrayerInfo(sample, 23 * 60, 0);
  assert.equal(nextAtNight.name, 'Fajr');
  assert.equal(nextAtNight.isTomorrow, true);
  assert.equal(nextAtNight.countdownSeconds, 6 * 3600);
  assert.equal(formatMinutesToHHMM(sample.Fajr), '05:00');
  assert.equal(formatUtcOffsetLabel(3.5), 'UTC+03:30');
});

test('getPrayerIntervalProgress calculates accurate interval ratios for daytime and overnight windows', () => {
  const sample = {
    Fajr: 300, // 05:00
    Sunrise: 380,
    Dhuhr: 730,
    Asr: 940, // 15:40
    Maghrib: 1080, // 18:00
    Isha: 1170, // 19:30
  };

  // Midpoint between Asr (940m) and Maghrib (1080m) is 1010m (16:50) -> 50% progress
  const midday = getPrayerIntervalProgress(sample, 1010, 0);
  assert.equal(midday.previousName, 'Asr');
  assert.equal(midday.nextName, 'Maghrib');
  assert.equal(midday.isTomorrow, false);
  assert.equal(midday.progress, 0.5);
  assert.equal(midday.countdownFormatted, '01:10:00');

  // After Isha (19:30 -> 05:00 next day = 570m total). At 22:30 (180m elapsed), 390m remain
  const lateNight = getPrayerIntervalProgress(sample, 22 * 60 + 30, 0);
  assert.equal(lateNight.previousName, 'Isha');
  assert.equal(lateNight.nextName, 'Fajr');
  assert.equal(lateNight.isTomorrow, true);
  assert.equal(lateNight.remainingSeconds, 390 * 60);
  assert.ok(Math.abs(lateNight.progress - 180 / 570) < 1e-6);

  // Before Fajr at 02:00 (390m since 19:30, 180m left until 05:00)
  const preFajr = getPrayerIntervalProgress(sample, 2 * 60, 0);
  assert.equal(preFajr.previousName, 'Isha');
  assert.equal(preFajr.nextName, 'Fajr');
  assert.equal(preFajr.isTomorrow, false);
  assert.equal(preFajr.remainingSeconds, 180 * 60);
});

test('evaluateFeedShield strips all Netflix and Prime Video promotional ads by default', () => {
  const { visibleItems, blockedItems } = evaluateFeedShield(
    UPSTREAM_LAUNCHER_FEED,
    DEFAULT_SHIELD_RULES,
    'MENA'
  );

  assert.equal(visibleItems.length, 0);
  assert.equal(blockedItems.length, UPSTREAM_LAUNCHER_FEED.length);
  assert.ok(blockedItems.some((item) => item.source === 'netflix-promo'));
  assert.ok(blockedItems.some((item) => item.source === 'prime-promo'));
});

test('isAppPermittedInRegion and filterChannelsByRegion enforce geo-restriction policy', () => {
  const shahid = INSTALLED_TV_APPS.find((a) => a.id === 'shahid')!;
  assert.equal(isAppPermittedInRegion(shahid, 'MENA'), true);
  assert.equal(isAppPermittedInRegion(shahid, 'AMERICAS'), false);

  const americasChannels = filterChannelsByRegion(LIVE_CHANNELS, 'AMERICAS');
  assert.ok(americasChannels.some((c) => c.id === 'bloomberg'));
  assert.ok(!americasChannels.some((c) => c.id === 'alarabiya'));
});

test('sportsData filters matches and sorts league standings by points then GD', () => {
  const liveEpl = filterMatches(SPORTS_MATCHES, 'epl', 'live');
  assert.equal(liveEpl.length, 1);
  assert.equal(liveEpl[0].homeTeam, 'Arsenal');

  const eplStandings = getSortedStandings('epl');
  assert.ok(eplStandings[0].points >= eplStandings[1].points);
});

test('sportsData toggles match reminders and detects approaching kickoffs within lead window', () => {
  const afterAdd = toggleMatchReminder([], 'm4');
  assert.deepEqual(afterAdd, ['m4']);
  const afterRemove = toggleMatchReminder(afterAdd, 'm4');
  assert.deepEqual(afterRemove, []);

  // m4 is today at 20:30 (1230m). At 20:05 (1205m), 25m remain -> triggers within 30m lead window
  const approaching = findApproachingMatchReminders(SPORTS_MATCHES, ['m4', 'm5'], 20 * 60 + 5, [], 30);
  assert.equal(approaching.length, 1);
  assert.equal(approaching[0].match.id, 'm4');
  assert.equal(approaching[0].minutesUntilKickoff, 25);

  // If dismissed, it no longer triggers
  const dismissed = findApproachingMatchReminders(SPORTS_MATCHES, ['m4'], 20 * 60 + 5, ['m4'], 30);
  assert.equal(dismissed.length, 0);

  // Filtered reminders view returns only reminded upcoming matches
  const remindedOnly = filterMatches(SPORTS_MATCHES, 'all', 'reminders', ['m4']);
  assert.equal(remindedOnly.length, 1);
  assert.equal(remindedOnly[0].id, 'm4');
});

test('i18n supports en, ar (RTL), fr, and tr with complete non-empty dictionaries', () => {
  assert.equal(SUPPORTED_LANGUAGES.length, 4);
  assert.equal(getLanguageOption('ar').direction, 'rtl');
  assert.equal(getLanguageOption('en').direction, 'ltr');
  assert.equal(getLanguageOption('fr').direction, 'ltr');
  assert.equal(getLanguageOption('tr').direction, 'ltr');

  for (const lang of SUPPORTED_LANGUAGES) {
    const dict = getTranslations(lang.code);
    assert.ok(dict.nav.home.length > 0);
    assert.ok(dict.settings.languageTitle.length > 0);
    assert.ok(dict.prayer.names.Maghrib.length > 0);
    assert.ok(dict.weather.title.length > 0);
    assert.ok(dict.sports.remindMe.length > 0);
    assert.equal(Object.keys(dict).length, Object.keys(TRANSLATIONS.en).length);
  }
});

test('weather utilities convert C/F accurately, map WMO codes, and produce 3-day city forecast', () => {
  assert.equal(convertCelsius(0, 'F'), 32);
  assert.equal(convertCelsius(25, 'F'), 77);
  assert.equal(convertCelsius(25.4, 'C'), 25);

  assert.equal(mapWmoCodeToCondition(0), 'clear');
  assert.equal(mapWmoCodeToCondition(63), 'rain');
  assert.equal(mapWmoCodeToCondition(95), 'storm');

  const makkah = WORLD_CITIES.find((c) => c.id === 'makkah')!;
  const london = WORLD_CITIES.find((c) => c.id === 'london')!;
  const makkahWx = getCityFallbackWeather(makkah, new Date('2026-11-15T12:00:00Z'));
  const londonWx = getCityFallbackWeather(london, new Date('2026-11-15T12:00:00Z'));

  assert.equal(makkahWx.daily.length, 3);
  assert.ok(makkahWx.currentTempC > londonWx.currentTempC, 'Makkah should be warmer than London in November');
});
