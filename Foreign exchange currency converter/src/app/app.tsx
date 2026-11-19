import { RouterProvider } from 'react-router-dom'

import { QueryProvider, ThemeProvider } from './providers'
import { router } from './router'

export function App() {
  return <QueryProvider><ThemeProvider><RouterProvider router={router} /></ThemeProvider></QueryProvider>
}

