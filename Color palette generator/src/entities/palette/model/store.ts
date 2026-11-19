import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { generateColors } from '../lib/generate'
import { readPaletteFromUrl, syncPaletteUrl } from '../lib/urlSync'

import type { Palette, PaletteType, ColorItem } from './types'

type Snapshot = { colors: Palette['colors']; type: PaletteType }
type PaletteState = {
  colors: Palette['colors']; type: PaletteType; mode: 'palette' | 'preview'; previewTheme: 'light' | 'dark'
  past: Snapshot[]; future: Snapshot[]; saved: Snapshot[]
  generate: () => boolean; setType: (type: PaletteType) => void; toggleLock: (index: number) => void
  setMode: (mode: 'palette' | 'preview') => void; togglePreviewTheme: () => void; undo: () => void; redo: () => void; save: () => void; restoreSaved: (index: number) => void
}
const initial = readPaletteFromUrl()
const snap = (state: Pick<PaletteState, 'colors' | 'type'>): Snapshot => ({ colors: state.colors.map((c) => ({ ...c })) as Palette['colors'], type: state.type })
const historyPush = (past: Snapshot[], current: Snapshot): Snapshot[] => [...past, current].slice(-50)
const persistOptions = { name: 'paintbox-saved-palettes', partialize: (s: PaletteState) => ({ saved: s.saved }) }
export const usePaletteStore = create<PaletteState>()(persist((set, get) => ({
  ...initial, mode: 'palette', previewTheme: 'light', past: [], future: [], saved: [],
  generate: () => { const state = get(); if (state.colors.every((c) => c.isLocked)) return false; set({ colors: generateColors(state.type, state.colors), past: historyPush(state.past, snap(state)), future: [] }); return true },
  setType: (type) => set((state) => type === state.type ? state : ({ type, colors: generateColors(type, state.colors), past: historyPush(state.past, snap(state)), future: [] })),
  toggleLock: (index) => set((state) => ({ colors: state.colors.map((c, i) => i === index ? { ...c, isLocked: !c.isLocked } : c) as Palette['colors'] })),
  setMode: (mode) => set({ mode }), togglePreviewTheme: () => set((s) => ({ previewTheme: s.previewTheme === 'light' ? 'dark' : 'light' })),
  undo: () => set((s) => { const previous = s.past.at(-1); return previous ? { ...previous, past: s.past.slice(0, -1), future: [snap(s), ...s.future] } : s }),
  redo: () => set((s) => { const next = s.future[0]; return next ? { ...next, past: historyPush(s.past, snap(s)), future: s.future.slice(1) } : s }),
  save: () => set((s) => ({ saved: [{ colors: s.colors.map((c) => ({ ...c, isLocked: false })) as Palette['colors'], type: s.type }, ...s.saved].slice(0, 20) })),
  restoreSaved: (index) => set((s) => { const saved = s.saved[index]; return saved ? { colors: saved.colors.map((c) => ({ ...c, isLocked: false })) as Palette['colors'], type: saved.type } : s }),
}), persistOptions))

usePaletteStore.subscribe((state) => syncPaletteUrl(state.colors, state.type))
export type { ColorItem }
