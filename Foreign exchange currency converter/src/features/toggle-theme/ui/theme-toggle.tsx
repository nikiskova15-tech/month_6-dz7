import { Moon, Sun } from 'lucide-react'

import { cn } from '@/shared/lib'

import { useThemeStore } from '../model/theme-store'

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  return <button type="button" aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`} onClick={toggleTheme} className={cn('inline-flex size-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white', className)}>{theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button>
}

