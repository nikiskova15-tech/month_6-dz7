import { cn } from '../lib/cn'
export function SegmentedControl<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string }[]; onChange: (value: T) => void; label: string }) {
  return <div className="inline-flex rounded-xl bg-slate-100 p-1" role="tablist" aria-label={label}>{options.map((option) => <button key={option.value} role="tab" aria-selected={value === option.value} onClick={() => onChange(option.value)} className={cn('rounded-lg px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-violet-500', value === option.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800')}>{option.label}</button>)}</div>
}
