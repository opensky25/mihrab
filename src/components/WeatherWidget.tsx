import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Droplets,
  Wind,
} from 'lucide-react';
import type { CityInfo } from '../utils/prayerTimes';
import type { Translations } from '../utils/i18n';
import {
  convertCelsius,
  type TemperatureUnit,
  type WeatherConditionKey,
  type WeatherForecastData,
} from '../utils/weather';

interface WeatherWidgetProps {
  city: CityInfo;
  weather: WeatherForecastData;
  unit: TemperatureUnit;
  loading: boolean;
  t: Translations;
  onChangeUnit: (unit: TemperatureUnit) => void;
  onChangeCity: () => void;
}

function WeatherConditionIcon({
  condition,
  className,
}: {
  condition: WeatherConditionKey;
  className?: string;
}) {
  switch (condition) {
    case 'clear':
      return <Sun className={`text-[#F5B942] ${className ?? ''}`} />;
    case 'partlyCloudy':
      return <CloudSun className={`text-[#F5B942] ${className ?? ''}`} />;
    case 'cloudy':
      return <Cloud className={`text-slate-300 ${className ?? ''}`} />;
    case 'fog':
      return <CloudFog className={`text-slate-400 ${className ?? ''}`} />;
    case 'drizzle':
      return <CloudDrizzle className={`text-sky-300 ${className ?? ''}`} />;
    case 'rain':
      return <CloudRain className={`text-sky-400 ${className ?? ''}`} />;
    case 'snow':
      return <Snowflake className={`text-cyan-200 ${className ?? ''}`} />;
    case 'storm':
      return <CloudLightning className={`text-amber-300 ${className ?? ''}`} />;
  }
}

export function WeatherWidget({
  city,
  weather,
  unit,
  loading,
  t,
  onChangeUnit,
  onChangeCity,
}: WeatherWidgetProps) {
  const currentVal = convertCelsius(weather.currentTempC, unit);
  const feelsLikeVal = convertCelsius(weather.apparentTempC, unit);
  const unitSuffix = unit === 'C' ? '°C' : '°F';

  return (
    <section
      aria-label={t.weather.title}
      data-testid="weather-widget"
      className="rounded-xl border border-white/10 bg-[#121720] p-6"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left: Current City Conditions */}
        <div className="flex flex-wrap items-center justify-between gap-6 lg:col-span-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0D1118]">
              <WeatherConditionIcon condition={weather.condition} className="h-7 w-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{t.weather.title}</span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onChangeCity}
                  className="tv-focus font-medium text-[#F5B942] hover:underline"
                >
                  {city.name}, {city.country}
                </button>
              </div>

              <div className="mt-1 flex items-baseline gap-3">
                <span
                  dir="ltr"
                  data-testid="weather-current-temp"
                  className="font-mono-tabular text-3xl font-bold text-white"
                >
                  {currentVal}
                  {unitSuffix}
                </span>
                <span className="text-sm font-medium text-slate-200">
                  {t.weather.conditions[weather.condition]}
                </span>
                {loading && (
                  <span className="text-xs text-slate-400">...</span>
                )}
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>
                  {t.weather.feelsLike}:{' '}
                  <span dir="ltr" className="font-mono-tabular text-slate-200">
                    {feelsLikeVal}
                    {unitSuffix}
                  </span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Droplets className="h-3 w-3 text-sky-400" />
                  <span>{t.weather.humidity}:</span>
                  <span dir="ltr" className="font-mono-tabular text-slate-200">
                    {weather.humidityPercent}%
                  </span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Wind className="h-3 w-3 text-slate-300" />
                  <span>{t.weather.wind}:</span>
                  <span dir="ltr" className="font-mono-tabular text-slate-200">
                    {weather.windKmh} km/h
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* °C / °F Unit Toggle */}
          <div
            role="group"
            aria-label="Temperature unit"
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#0A0D12] p-1 shrink-0"
          >
            {(['C', 'F'] as const).map((u) => {
              const active = unit === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onChangeUnit(u)}
                  aria-pressed={active}
                  className={`tv-focus rounded-md px-2.5 py-1 font-mono-tabular text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[#D99B38] text-[#0A0D12]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  °{u}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: 3-Day Forecast Outlook */}
        <div className="border-t border-white/10 pt-4 lg:col-span-6 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-6">
          <div className="mb-2.5 flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-slate-300">{t.weather.forecast3Day}</span>
            <span>
              {weather.source === 'live' ? t.weather.liveSource : t.weather.estimatedSource}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {weather.daily.map((day) => {
              const maxVal = convertCelsius(day.tempMaxC, unit);
              const minVal = convertCelsius(day.tempMinC, unit);
              return (
                <div
                  key={day.dateIso}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-[#0D1118] px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white">{day.dayLabel}</div>
                    <div className="truncate text-[11px] text-slate-400">
                      {t.weather.conditions[day.condition]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <WeatherConditionIcon condition={day.condition} className="h-4 w-4" />
                    <div dir="ltr" className="font-mono-tabular text-end text-xs">
                      <span className="font-semibold text-white">{maxVal}°</span>
                      <span className="text-slate-500"> / {minVal}°</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
