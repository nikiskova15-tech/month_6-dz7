import { createBrowserRouter } from 'react-router-dom'

import { ConverterPage } from '@/pages/converter-page'
import { HistoryPage } from '@/pages/history-page'
import { MarketsPage } from '@/pages/markets-page'
import { NotFoundPage } from '@/pages/not-found-page'

import { AppLayout } from './layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <ConverterPage /> },
      { path: 'markets', element: <MarketsPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

