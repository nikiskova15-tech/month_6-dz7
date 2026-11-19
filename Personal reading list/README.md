# Bookshelf

Адаптивная SPA для личной библиотеки, учёта прогресса и годовых итогов чтения. Интерфейс на русском языке; демо-режим работает локально, поиск использует Open Library.

## Запуск

```bash
npm install
npm run dev
```

Storybook: `npm run storybook`  
Проверки: `npm run lint` и `npm run build`

## Структура

```text
src/
  app/             приложение, роутер, провайдеры, глобальные стили
  pages/           landing, library, discover, book details
  widgets/         sidebar, book grid / 3D shelf, year review
  features/        расширение взаимодействий библиотеки
  entities/        book API и типы, библиотека Zustand
  shared/          UI kit, API hooks, утилиты
.storybook/        конфигурация Storybook
```

## Основные возможности

- Гостевая библиотека из 25 книг, фильтры, поиск, сортировка и пользовательские полки.
- GRID, 3D SHELF и STACK с управлением стрелками и свайпом.
- Open Library поиск и жанровые подборки через TanStack Query.
- Прогресс чтения, авто-завершение, избранное, рейтинг и заметки.
- Цель чтения, график по месяцам и экспорт итоговой карточки в PNG.
- Состояние сохраняется в localStorage.
