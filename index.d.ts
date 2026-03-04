import type { Got } from 'got'

export interface PingUrlResponse {
  url: string
  statusCode: number
  statusMessage?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
  [key: string]: unknown
}

export interface KeyvOptions {
  store?: Map<string, unknown> | Record<string, unknown>
  ttl?: number
  namespace?: string
  serialize?: (value: unknown) => string
  deserialize?: (value: string) => unknown
}

export interface MemoOptions {
  cacheKey?: (args: unknown[]) => string | string[]
  value?: (result: PingUrlResponse) => unknown
}

export interface GotOptions {
  method?: string
  headers?: Record<string, string>
  searchParams?: Record<string, string | number | boolean>
  [key: string]: unknown
}

export interface CreatePingUrl {
  (keyvOptions?: KeyvOptions, memoOptions?: MemoOptions): PingUrlFunction
  isReachable: IsReachable
}

export interface PingUrlFunction {
  (url: string, gotOptions?: GotOptions): Promise<PingUrlResponse>
}

export interface IsReachable {
  (url: string, options?: GotOptions): Promise<boolean>
}

declare const createPingUrl: CreatePingUrl

export default createPingUrl
