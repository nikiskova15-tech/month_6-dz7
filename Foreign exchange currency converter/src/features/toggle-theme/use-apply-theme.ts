import { useEffect } from 'react'

import { useThemeStore } from './model/theme-store'

export function useApplyTheme(): void {
  const theme = useThemeStore((state) => state.theme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])
}

