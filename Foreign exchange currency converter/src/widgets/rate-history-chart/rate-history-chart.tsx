import { motion, useReducedMotion } from 'motion/react'
import { useMemo, useState, type PointerEvent } from 'react'

import { toHistoricalPoints, useHistoricalRates, type ChartRange, type CurrencyPair, type HistoricalPoint } from '@/entities/currency'
import { ChartRangeSwitch, useChartRangeShortcut } from '@/features/switch-chart-range'
import { cn, formatNumber } from '@/shared/lib'
import { Button, Skeleton } from '@/shared/ui'

const chartWidth = 800
const chartHeight = 260
const inset = { top: 18, right: 18, bottom: 28, left: 18 }

interface PlotPoint extends HistoricalPoint {
  x: number
  y: number
}

function plotPoints(points: readonly HistoricalPoint[]): { values: PlotPoint[]; min: number; max: number } {
  const rates = points.map((point) => point.rate)
  const min = Math.min(...rates)
  const max = Math.max(...rates)
  const startTime = Date.parse(`${points[0]?.date ?? ''}T00:00:00Z`)
  const endTime = Date.parse(`${points.at(-1)?.date ?? ''}T00:00:00Z`)
  const timeSpan = Math.max(endTime - startTime, 1)
  const spread = max - min || Math.max(Math.abs(max) * 0.01, 0.0001)
  const innerWidth = chartWidth - inset.left - inset.right
  const innerHeight = chartHeight - inset.top - inset.bottom
  const values = points.map((point) => ({
    ...point,
    x: inset.left + (points.length <= 1 ? 0 : ((Date.parse(`${point.date}T00:00:00Z`) - startTime) / timeSpan) * innerWidth),
    y: inset.top + ((max + spread * 0.05 - point.rate) / (spread * 1.1)) * innerHeight,
  }))
  return { values, min, max }
}

function linePath(points: readonly PlotPoint[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

export interface RateHistoryChartProps {
  pair: CurrencyPair
}

export function RateHistoryChart({ pair }: RateHistoryChartProps) {
  const [range, setRange] = useState<ChartRange>('1M')
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const query = useHistoricalRates(pair.from, pair.to, range)
  const reduceMotion = useReducedMotion()
  useChartRangeShortcut(setRange)
  const data = useMemo(() => query.data === undefined ? [] : toHistoricalPoints(query.data.data, pair.to), [query.data, pair.to])
  const plot = useMemo(() => data.length > 0 ? plotPoints(data) : null, [data])
  const path = plot === null ? '' : linePath(plot.values)
  const selected = hoverIndex === null || plot === null ? undefined : plot.values[hoverIndex]
  const startRate = data[0]?.rate
  const endRate = data.at(-1)?.rate
  const change = startRate !== undefined && endRate !== undefined && startRate !== 0 ? ((endRate - startRate) / startRate) * 100 : null

  function moveCrosshair(event: PointerEvent<SVGSVGElement>): void {
    if (plot === null || plot.values.length === 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * chartWidth
    const index = plot.values.reduce((closest, point, candidate) => Math.abs(point.x - relativeX) < Math.abs((plot.values[closest]?.x ?? 0) - relativeX) ? candidate : closest, 0)
    setHoverIndex(index)
  }

  return <section className={cn('rounded-3xl border border-slate-800 bg-[#131a26] p-5 sm:p-7')} aria-labelledby="history-chart-heading">
    <div className={cn('mb-5 flex flex-wrap items-center justify-between gap-3')}><div><h2 id="history-chart-heading" className={cn('font-semibold text-white')}>Rate history</h2><p className={cn('mt-1 text-xs text-slate-500')}>{pair.from} to {pair.to} · daily ECB data</p></div><ChartRangeSwitch value={range} onChange={setRange} /></div>
    {query.isError && <div role="alert" className={cn('mb-4 flex items-center justify-between rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-200')}><span>{query.error.message}</span><Button size="sm" onClick={() => { void query.refetch() }}>Retry</Button></div>}
    {query.isLoading ? <Skeleton className={cn('h-64 w-full')} /> : plot === null ? <div className={cn('grid h-64 place-items-center rounded-2xl border border-dashed border-slate-800 text-sm text-slate-500')}>Historical rates are unavailable for this pair.</div> : <>
      <div className={cn('relative')}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`Exchange rate history for ${pair.from} to ${pair.to}`} className={cn('h-56 w-full touch-none overflow-visible sm:h-64')} onPointerMove={moveCrosshair} onPointerLeave={() => setHoverIndex(null)} onPointerDown={moveCrosshair}>
          <defs><linearGradient id="rate-area-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity="0.18" /><stop offset="100%" stopColor="#34d399" stopOpacity="0" /></linearGradient></defs>
          {[0, 1, 2, 3].map((row) => <line key={row} x1={inset.left} x2={chartWidth - inset.right} y1={inset.top + row * ((chartHeight - inset.top - inset.bottom) / 3)} y2={inset.top + row * ((chartHeight - inset.top - inset.bottom) / 3)} stroke="#1e293b" strokeDasharray="4 6" />)}
          <path d={`${path} L ${plot.values.at(-1)?.x ?? 0} ${chartHeight - inset.bottom} L ${plot.values[0]?.x ?? 0} ${chartHeight - inset.bottom} Z`} fill="url(#rate-area-gradient)" />
          <motion.path d={path} fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }} />
          {selected && <><line x1={selected.x} x2={selected.x} y1={inset.top} y2={chartHeight - inset.bottom} stroke="#94a3b8" strokeDasharray="4 4" /><circle cx={selected.x} cy={selected.y} r="6" fill="#0b0f17" stroke="#34d399" strokeWidth="3" /></>}
        </svg>
        {selected && <div role="status" className={cn('pointer-events-none absolute left-1/2 top-2 rounded-lg border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs shadow-lg')} style={{ left: `${Math.max(12, Math.min(88, (selected.x / chartWidth) * 100))}%`, transform: 'translateX(-50%)' }}><span className={cn('block text-slate-400')}>{new Date(`${selected.date}T00:00:00`).toLocaleDateString()}</span><span className={cn('font-mono text-white')}>{formatNumber(selected.rate, 6)} {pair.to}</span></div>}
      </div>
      <div className={cn('mt-4 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4 text-xs')}><div><span className={cn('block text-slate-500')}>Low</span><span className={cn('mt-1 block font-mono text-slate-200')}>{formatNumber(plot.min, 6)}</span></div><div><span className={cn('block text-slate-500')}>High</span><span className={cn('mt-1 block font-mono text-slate-200')}>{formatNumber(plot.max, 6)}</span></div><div><span className={cn('block text-slate-500')}>Period change</span><span className={change !== null && change >= 0 ? 'mt-1 block font-mono text-emerald-400' : 'mt-1 block font-mono text-rose-400'}>{change === null ? '—' : `${change >= 0 ? '+' : ''}${formatNumber(change, 2)}%`}</span></div></div>
    </>}
  </section>
}


