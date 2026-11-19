# Paintbox — генератор цветовых палитр

Адаптивное React + TypeScript SPA для создания, сохранения и экспорта гармоничных палитр. Визуальное решение: светлая рабочая область, закреплённая нижняя панель генерации и тёмный интерфейсный предпросмотр по выбору.

## Запуск

```bash
npm install
npm run dev
npm run storybook
npm run test
npm run build
```

## Структура

```text
src/
  app/                 entry, глобальные стили и уведомления
  pages/generator/     экран генератора
  widgets/             header, palette canvas, preview, control bar
  features/            генерация, lock, экспорт, история, оттенки, сохранение
  entities/palette/    типы, Zustand store, цветовая математика и URL
  shared/              UI-kit, clsx/tailwind-merge, базовые хуки и config
.storybook/            конфигурация Storybook и a11y
```

Зависимости: React, TypeScript, Vite, Tailwind CSS v4, Zustand, Motion, Lucide, clsx, tailwind-merge, Inter Variable, JetBrains Mono, Storybook + addon-a11y, Vitest, ESLint.

## Реализовано

- Пять типов цветовых схем, фиксация отдельных цветов, блокировка Space при вводе и фокусе на интерактивных элементах.
- Undo/redo для генерации и смены типа, а также Ctrl/Cmd+Z и Ctrl/Cmd+Shift+Z.
- Ссылка синхронизируется через query-параметры; блокировки в неё не попадают.
- Экспорт CSS variables, HEX и share URL; копирование отдельных HEX и оттенков.
- Превью light/dark, сохранённые палитры в localStorage, цветовые шкалы 50–950.
- В `entities/palette/lib` находятся типизированные конвертации HEX/RGB/HSL, WCAG-контраст, генератор палитр и оттенков.

## Принятые решения

- Сохранённые палитры выводятся компактными точками у нижнего края экрана; клик по набору восстанавливает его. Отдельного экрана каталога в коротком интерфейсе нет.
- URL содержит только цвета и тип. При неверном параметре приложение использует встроенную стартовую палитру.
