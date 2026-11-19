import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/app/styles.css'

const preview: Preview = {
  parameters: { controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } }, a11y: { test: 'todo' } },
  decorators: [(Story, context) => React.createElement('div', { className: context.globals.theme === 'dark' ? 'dark min-h-screen bg-slate-950 p-8 text-white' : 'min-h-screen bg-[#f8f9fa] p-8' }, React.createElement(Story))],
  globalTypes: { theme: { description: 'Theme', defaultValue: 'light', toolbar: { title: 'Theme', icon: 'circlehollow', items: ['light', 'dark'] } } },
}
export default preview
