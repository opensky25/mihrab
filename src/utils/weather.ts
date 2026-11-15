import type { CityInfo } from './prayerTimes';

export type TemperatureUnit = 'C' | 'F';

export type WeatherConditionKey =
  | 'clear'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm';

export interface DailyForecastDay {
  dateIso: string;
  dayLabel: string;
  condition: WeatherConditionKey;
  tempMaxC: number;
  tempMinC: number;
}

export interface WeatherForecastData {
  cityId: string;
  currentTempC: number;
  apparentTempC: number;
  humidityPercent: number;
  windKmh: number;
  condition: WeatherConditionKey;
  daily: DailyForecastDay[];
  source: 'live' | 'estimated';
}

export function convertCelsius(tempC: number, unit: TemperatureUnit): number {
  if (unit === 'F') {
    return Math.round((tempC * 9) / 5 + 32);
  }
  return Math.round(tempC);
}

export function mapWmoCodeToCondition(wmoCode: number): WeatherConditionKey {
  if (wmoCode === 0) return 'clear';
  if (wmoCode === 1 || wmoCode === 2) return 'partlyCloudy';
  if (wmoCode === 3) return 'cloudy';
  if (wmoCode === 45 || wmoCode === 48) return 'fog';
  if (wmoCode >= 51 && wmoCode <= 57) return 'drizzle';
  if ((wmoCode >= 61 && wmoCode <= 67) || (wmoCode >= 80 && wmoCode <= 82)) return 'rain';
  if ((wmoCode >= 71 && wmoCode <= 77) || wmoCode === 85 || wmoCode === 86) return 'snow';
  if (wmoCode >= 95) return 'storm';
  return 'partlyCloudy';
}

/**
 * Deterministic climate-grounded weather model used immediately on city switch
 * and as a resilient offline/sandbox fallback if Open-Meteo is unreachable.
 */
export function getCityFallbackWeather(
  city: CityInfo,
  now: Date,
  localeTag: string = 'en-US'
): WeatherForecastData {
  const absLat = Math.abs(city.latitude);
  const month = now.getUTCMonth(); // 0-11
  const isNorthern = city.latitude >= 0;
  // Seasonal wave peaks in July (month 6) for Northern hemisphere
  const seasonalPhase = Math.cos(((month - (isNorthern ? 6 : 0)) / 12) * Math.PI * 2);

  // Base mean temperature from latitude + seasonal swing
  const baseMean = 29 - absLat * 0.42 + seasonalPhase * (absLat > 23 ? 8 : 3);
  const citySeed = city.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  let condition: WeatherConditionKey = 'partlyCloudy';
  if (city.region === 'MENA' && absLat < 30) {
    condition = citySeed % 3 === 0 ? 'partlyCloudy' : 'clear';
  } else if (city.region === 'Europe') {
    condition = citySeed % 2 === 0 ? 'cloudy' : 'rain';
  } else if (city.region === 'AsiaPacific' && absLat < 15) {
    condition = citySeed % 2 === 0 ? 'partlyCloudy' : 'rain';
  }

  const currentTempC = Math.round(baseMean + ((citySeed % 5) - 2));
  const apparentTempC = currentTempC + (condition === 'clear' ? 1 : -1);
  const humidityPercent =
    condition === 'rain' ? 78 : condition === 'clear' && city.region === 'MENA' ? 32 : 56;
  const windKmh = 9 + (citySeed % 14);

  const daily: DailyForecastDay[] = [1, 2, 3].map((offsetDays) => {
    const d = new Date(now.getTime() + offsetDays * 86400 * 1000);
    const dayLabel = d.toLocaleDateString(localeTag, { weekday: 'short' });
    const swing = ((citySeed + offsetDays) % 3) - 1;
    const dayCondition: WeatherConditionKey =
      offsetDays === 2 && condition === 'rain' ? 'partlyCloudy' : condition;
    return {
      dateIso: d.toISOString().slice(0, 10),
      dayLabel,
      condition: dayCondition,
      tempMaxC: currentTempC + 3 + swing,
      tempMinC: currentTempC - 6 + swing,
    };
  });

  return {
    cityId: city.id,
    currentTempC,
    apparentTempC,
    humidityPercent,
    windKmh,
    condition,
    daily,
    source: 'estimated',
  };
}

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

export async function fetchCityWeather(
  city: CityInfo,
  localeTag: string,
  externalSignal?: AbortSignal
): Promise<WeatherForecastData> {
  const now = new Date();
  const fallback = getCityFallbackWeather(city, now, localeTag);

  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), 3500);
  const onExternalAbort = () => controller.abort();
  externalSignal?.addEventListener('abort', onExternalAbort);

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${city.latitude.toFixed(4)}` +
      `&longitude=${city.longitude.toFixed(4)}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&forecast_days=4&timezone=auto`;

    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return fallback;

    const data = (await res.json()) as OpenMeteoResponse;
    if (!data.current || typeof data.current.temperature_2m !== 'number') {
      return fallback;
    }

    const dailyTimes = data.daily?.time ?? [];
    const dailyCodes = data.daily?.weather_code ?? [];
    const dailyMax = data.daily?.temperature_2m_max ?? [];
    const dailyMin = data.daily?.temperature_2m_min ?? [];

    const daily: DailyForecastDay[] = [1, 2, 3]
      .filter((idx) => idx < dailyTimes.length)
      .map((idx) => {
        const iso = dailyTimes[idx];
        const parsedDate = new Date(`${iso}T12:00:00Z`);
        const dayLabel = parsedDate.toLocaleDateString(localeTag, {
          weekday: 'short',
          timeZone: 'UTC',
        });
        return {
          dateIso: iso,
          dayLabel,
          condition: mapWmoCodeToCondition(dailyCodes[idx] ?? 2),
          tempMaxC: Math.round(dailyMax[idx] ?? fallback.currentTempC + 2),
          tempMinC: Math.round(dailyMin[idx] ?? fallback.currentTempC - 5),
        };
      });

    return {
      cityId: city.id,
      currentTempC: Math.round(data.current.temperature_2m),
      apparentTempC: Math.round(data.current.apparent_temperature ?? data.current.temperature_2m),
      humidityPercent: Math.round(data.current.relative_humidity_2m ?? 50),
      windKmh: Math.round(data.current.wind_speed_10m ?? 10),
      condition: mapWmoCodeToCondition(data.current.weather_code ?? 0),
      daily: daily.length === 3 ? daily : fallback.daily,
      source: 'live',
    };
  } catch {
    return fallback;
  } finally {
    globalThis.clearTimeout(timeoutId);
    externalSignal?.removeEventListener('abort', onExternalAbort);
  }
}
