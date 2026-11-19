import { Check, ChevronDown, Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'

import { isCurrencyCode, type CurrencyCode, type CurrencyInfo } from '@/entities/currency'
import { cn, useDebounce } from '@/shared/lib'
import { Button } from '@/shared/ui'

import { filterCurrencies } from '../lib/filter-currencies'

export interface CurrencyPickerProps {
  currencies: readonly CurrencyInfo[]
  value: string
  onChange: (code: CurrencyCode) => void
  label: string
  disabled?: boolean
  enableSearchShortcut?: boolean
  className?: string
}

export function CurrencyPicker({ currencies, value, onChange, label, disabled = false, enableSearchShortcut = false, className }: CurrencyPickerProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const debouncedQuery = useDebounce(query, 100)
  const listRef = useRef<HTMLUListElement>(null)
  const filtered = useMemo(() => filterCurrencies(currencies, debouncedQuery), [currencies, debouncedQuery])
  const selected = currencies.find((currency) => currency.code === value)
  const activeOptionId = filtered[activeIndex] === undefined ? undefined : `${id}-option-${filtered[activeIndex].code}`

  useEffect(() => {
    if (!enableSearchShortcut || disabled) return
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      const target = event.target
      const editing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if (event.key === '/' && !editing) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [enableSearchShortcut, disabled])

  useEffect(() => {
    setActiveIndex((index) => Math.max(0, Math.min(index, filtered.length - 1)))
  }, [filtered.length])

  function choose(code: string): void {
    if (isCurrencyCode(code, currencies)) {
      onChange(code)
      setOpen(false)
      setQuery('')
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      setOpen(false)
      setQuery('')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(0, Math.min(index + 1, filtered.length - 1)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && filtered[activeIndex] !== undefined) {
      event.preventDefault()
      choose(filtered[activeIndex].code)
    }
  }

  return <div className={cn('relative min-w-0', className)}>
    <span className={cn('mb-2 block text-xs font-medium text-slate-400')}>{label}</span>
    <Button type="button" variant="secondary" disabled={disabled} title={enableSearchShortcut ? 'Search currencies · /' : undefined} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} className={cn('w-full justify-between')}>
      <span className={cn('truncate')}>{selected ? `${selected.code} · ${selected.name}` : value}</span><ChevronDown aria-hidden="true" size={16} />
    </Button>
    {open && <div className={cn('absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl')}>
      <div className={cn('border-b border-slate-800 p-2')}><div className={cn('relative')}><Search aria-hidden="true" size={15} className={cn('absolute left-3 top-1/2 -translate-y-1/2 text-slate-500')} /><input autoFocus type="text" role="combobox" aria-label={`Search ${label}`} aria-autocomplete="list" aria-controls={`${id}-listbox`} aria-expanded="true" aria-activedescendant={activeOptionId} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={handleKeyDown} placeholder="Search currency" className={cn('w-full rounded-lg bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-emerald-400')} /></div></div>
      <ul id={`${id}-listbox`} ref={listRef} role="listbox" aria-label={`${label} options`} className={cn('max-h-64 overflow-y-auto p-1')}>
        {filtered.map((currency, index) => <li key={currency.code} id={`${id}-option-${currency.code}`} role="option" aria-selected={currency.code === value} onMouseEnter={() => setActiveIndex(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(currency.code)} className={cn('flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800', index === activeIndex && 'bg-slate-800 text-white')}><span className={cn('truncate')}><span className={cn('mr-2 font-semibold text-slate-100')}>{currency.code}</span>{currency.name}</span>{currency.code === value && <Check size={16} className={cn('shrink-0 text-emerald-400')} />}</li>)}
        {filtered.length === 0 && <li className={cn('px-3 py-5 text-center text-sm text-slate-500')}>No currencies found</li>}
      </ul>
    </div>}
  </div>
}


