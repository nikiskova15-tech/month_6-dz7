import { useApplyTheme } from '@/features/toggle-theme'

import type { ReactNode } from 'react'

export interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useApplyTheme()
  return children
}

