import { FALLBACK_CACHE_PREFIX } from '@/shared/config'

import { ApiError } from './api-error'

export interface CachedResponse<T> {
  data: T
  updatedAt: number
  stale: boolean
}

interface StoredResponse<T> {
  data: T
  updatedAt: number
}

const memoryCache = new Map<string, StoredResponse<unknown>>()

function readCache<T>(key: string, isExpected: (value: unknown) => value is T): StoredResponse<T> | undefined {
  const memoryValue = memoryCache.get(key)
  if (memoryValue !== undefined && isExpected(memoryValue.data)) return { data: memoryValue.data, updatedAt: memoryValue.updatedAt }
  try {
    const raw = window.localStorage.getItem(`${FALLBACK_CACHE_PREFIX}${key}`)
    if (raw === null) return undefined
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || !('data' in parsed) || !('updatedAt' in parsed)) return undefined
    if (typeof parsed.updatedAt !== 'number' || !isExpected(parsed.data)) return undefined
    return { data: parsed.data, updatedAt: parsed.updatedAt }
  } catch {
    return undefined
  }
}

function writeCache<T>(key: string, value: StoredResponse<T>): void {
  memoryCache.set(key, value)
  try {
    window.localStorage.setItem(`${FALLBACK_CACHE_PREFIX}${key}`, JSON.stringify(value))
  } catch {
    // The in-memory cache remains available when browser storage is full or disabled.
  }
}

export async function fetchJson<T>(
  url: string,
  isExpected: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<CachedResponse<T>> {
  try {
    const response = await fetch(url, { signal })
    if (!response.ok) throw new ApiError(`Request failed with status ${response.status}`, response.status)
    const value: unknown = await response.json()
    if (!isExpected(value)) throw new ApiError('The server returned data in an unexpected format')
    const cached = { data: value, updatedAt: Date.now() }
    writeCache(url, cached)
    return { ...cached, stale: false }
  } catch (error) {
    if (signal?.aborted) throw error
    const cached = readCache<T>(url, isExpected)
    if (cached !== undefined) return { ...cached, stale: true }
    if (error instanceof ApiError) throw error
    throw new ApiError(error instanceof Error ? error.message : 'Network request failed')
  }
}
