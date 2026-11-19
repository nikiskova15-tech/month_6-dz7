# FX Checker

Responsive single page currency converter built with React, TypeScript, Vite, Tailwind CSS, and Feature-Sliced Design.

Exchange rates and historical series come from the Frankfurter API, which publishes European Central Bank reference rates. These rates update on business days and do not represent an intraday trading quote.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

```bash
npm install
npm run dev
```

Vite serves the application at `http://localhost:3000`.

## Storybook

```bash
npm run storybook
```

Storybook starts at `http://localhost:6006` and includes the shared UI kit. Use the toolbar theme control to view stories in dark and light themes.

## Build and lint

```bash
npm run build
npm run lint
```

`npm run build` runs the TypeScript project build before creating the Vite production bundle. `npm run lint` checks the project with the flat ESLint configuration.

## Features

- Currency conversion with currency search, keyboard support, swap, and URL query parameters
- Daily market ticker and ECB historical rate chart with 1D, 1W, 1M, 1Y, and 5Y ranges
- Multi-currency comparison, favorite pairs, and a locally stored conversion log
- CSV export, dark and light theme, responsive navigation, and keyboard shortcuts

Conversion history, favorite pairs, and theme selection are stored in browser local storage. Successful API responses are cached locally for offline fallback.

