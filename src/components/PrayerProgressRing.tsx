import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { PrayerIntervalProgress } from '../utils/prayerTimes';
import type { Translations } from '../utils/i18n';

interface PrayerProgressRingProps {
  interval: PrayerIntervalProgress;
  t: Translations;
}

const SIZE = 224;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 96;
const INNER_RADIUS = 82;
const TRACK_MID_RADIUS = (OUTER_RADIUS + INNER_RADIUS) / 2;

export function PrayerProgressRing({ interval, t }: PrayerProgressRingProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const svg = d3.select(svgEl);

    let defs = svg.select<SVGDefsElement>('defs');
    if (defs.empty()) {
      defs = svg.append('defs');
      const grad = defs
        .append('linearGradient')
        .attr('id', 'mihrab-prayer-ring-grad')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');
      grad.append('stop').attr('offset', '0%').attr('stop-color', '#F5B942');
      grad.append('stop').attr('offset', '100%').attr('stop-color', '#D99B38');
    }

    let rootGroup = svg.select<SVGGElement>('g.ring-root');
    if (rootGroup.empty()) {
      rootGroup = svg
        .append('g')
        .attr('class', 'ring-root')
        .attr('transform', `translate(${CENTER}, ${CENTER})`);

      const trackArc = d3
        .arc<void>()
        .innerRadius(INNER_RADIUS)
        .outerRadius(OUTER_RADIUS)
        .startAngle(0)
        .endAngle(Math.PI * 2);

      rootGroup
        .append('path')
        .attr('class', 'ring-track')
        .attr('d', trackArc() ?? '')
        .attr('fill', 'rgba(255, 255, 255, 0.08)');

      // Subtle 12-hour horology tick marks inside the bezel
      const tickAngles = d3.range(12).map((i) => (i / 12) * Math.PI * 2);
      rootGroup
        .selectAll<SVGLineElement, number>('line.ring-tick')
        .data(tickAngles)
        .join('line')
        .attr('class', 'ring-tick')
        .attr('x1', (angle) => Math.sin(angle) * (INNER_RADIUS - 8))
        .attr('y1', (angle) => -Math.cos(angle) * (INNER_RADIUS - 8))
        .attr('x2', (angle) => Math.sin(angle) * (INNER_RADIUS - 3))
        .attr('y2', (angle) => -Math.cos(angle) * (INNER_RADIUS - 3))
        .attr('stroke', 'rgba(255, 255, 255, 0.16)')
        .attr('stroke-width', 1.25)
        .attr('stroke-linecap', 'round');

      rootGroup
        .append('path')
        .attr('class', 'ring-progress')
        .attr('fill', 'url(#mihrab-prayer-ring-grad)');

      rootGroup
        .append('circle')
        .attr('class', 'ring-marker')
        .attr('r', 4.5)
        .attr('fill', '#FDE68A')
        .attr('stroke', '#0A0D12')
        .attr('stroke-width', 1.5);
    }

    const clampedProgress = Math.max(0.004, Math.min(1, interval.progress));
    const endAngle = clampedProgress * Math.PI * 2;

    const progressArc = d3
      .arc<void>()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .startAngle(0)
      .endAngle(endAngle)
      .cornerRadius(7);

    rootGroup.select<SVGPathElement>('path.ring-progress').attr('d', progressArc() ?? '');

    rootGroup
      .select<SVGCircleElement>('circle.ring-marker')
      .attr('cx', Math.sin(endAngle) * TRACK_MID_RADIUS)
      .attr('cy', -Math.cos(endAngle) * TRACK_MID_RADIUS);
  }, [interval.progress]);

  const percentElapsed = Math.round(interval.progress * 100);
  const nextLabel = t.prayer.names[interval.nextName];
  const prevLabel = t.prayer.names[interval.previousName];

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[224px] w-[224px] items-center justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full"
          role="img"
          data-testid="prayer-progress-ring"
          aria-label={`${t.prayer.nextPrayerIn}: ${nextLabel} ${interval.countdownFormatted} (${percentElapsed}% ${t.prayer.elapsed})`}
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-xs font-medium text-[#F5B942]">
            {nextLabel}
            {interval.isTomorrow ? ` · ${t.home.tomorrow}` : ''}
          </span>
          <span
            dir="ltr"
            data-testid="prayer-ring-countdown"
            className="font-mono-tabular mt-1 text-3xl font-bold tracking-tight text-white"
          >
            {interval.countdownFormatted}
          </span>
          <span dir="ltr" className="font-mono-tabular mt-1 text-xs text-slate-400">
            {interval.nextTimeFormatted} · {percentElapsed}% {t.prayer.elapsed}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span>
          {t.prayer.previousPrayer}: <strong className="font-medium text-slate-200">{prevLabel}</strong>{' '}
          <span dir="ltr" className="font-mono-tabular">{interval.previousTimeFormatted}</span>
        </span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>
          {t.prayer.next}: <strong className="font-medium text-[#F5B942]">{nextLabel}</strong>{' '}
          <span dir="ltr" className="font-mono-tabular">{interval.nextTimeFormatted}</span>
        </span>
      </div>
    </div>
  );
}
