import type { Preview } from '@storybook/react-vite'
import { createElement } from 'react'
import '../src/app/styles.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['dark', 'light'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'light' ? 'light' : 'dark'
      document.documentElement.dataset.theme = theme
      return createElement('div', {
        className: theme === 'dark' ? 'min-h-screen bg-[#0B0F17] p-6 text-slate-100' : 'min-h-screen bg-[#F8FAFC] p-6 text-slate-900',
      }, createElement(Story))
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#0B0F17' },
        light: { name: 'Light', value: '#F8FAFC' },
      },
    },
  },
}

export default preview
