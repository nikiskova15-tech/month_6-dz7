import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['**/*.{ts,tsx}'],
    rules: { ...reactHooks.configs.recommended.rules, 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], '@typescript-eslint/no-non-null-assertion': 'off', 'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }], '@typescript-eslint/consistent-type-imports': 'error' },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh, boundaries, import: importPlugin },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    settings: { 'boundaries/elements': [
      { type: 'app', pattern: 'src/app/**' }, { type: 'pages', pattern: 'src/pages/**' }, { type: 'widgets', pattern: 'src/widgets/**' },
      { type: 'feature-generate', pattern: 'src/features/generate-palette/**' }, { type: 'feature-lock', pattern: 'src/features/toggle-color-lock/**' }, { type: 'feature-switch-type', pattern: 'src/features/switch-palette-type/**' }, { type: 'feature-copy', pattern: 'src/features/copy-color/**' }, { type: 'feature-export', pattern: 'src/features/export-palette/**' }, { type: 'feature-history', pattern: 'src/features/history-undo-redo/**' }, { type: 'feature-preview-theme', pattern: 'src/features/toggle-preview-theme/**' }, { type: 'feature-shades', pattern: 'src/features/inspect-shades/**' }, { type: 'feature-save', pattern: 'src/features/save-palette/**' },
      { type: 'entities', pattern: 'src/entities/**' }, { type: 'shared', pattern: 'src/shared/**' },
    ] },
    rules: { 'boundaries/element-types': ['error', { default: 'disallow', rules: [ { from: 'app', allow: ['pages', 'widgets', 'feature-generate', 'feature-lock', 'feature-switch-type', 'feature-copy', 'feature-export', 'feature-history', 'feature-preview-theme', 'feature-shades', 'feature-save', 'entities', 'shared'] }, { from: 'pages', allow: ['widgets', 'feature-generate', 'feature-lock', 'feature-switch-type', 'feature-copy', 'feature-export', 'feature-history', 'feature-preview-theme', 'feature-shades', 'feature-save', 'entities', 'shared'] }, { from: 'widgets', allow: ['feature-generate', 'feature-lock', 'feature-switch-type', 'feature-copy', 'feature-export', 'feature-history', 'feature-preview-theme', 'feature-shades', 'feature-save', 'entities', 'shared'] }, ...['feature-generate', 'feature-lock', 'feature-switch-type', 'feature-copy', 'feature-export', 'feature-history', 'feature-preview-theme', 'feature-shades', 'feature-save'].map((feature) => ({ from: feature, allow: ['entities', 'shared'] })), { from: 'entities', allow: ['shared'] }, { from: 'shared', allow: ['shared'] } ] }] },
  },
)
