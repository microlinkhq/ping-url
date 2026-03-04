import { ReachableUrlOptions, IsReachableResult } from 'reachable-url'

export interface PingUrlOptions {
  timeout?: number
  retries?: number
  retryTimeout?: number
}

export interface MemoizeOptions {
  ttl?: number
  cache?: Map<string, IsReachableResult>
}

declare const pingUrl: {
  (url: string, options?: PingUrlOptions): Promise<IsReachableResult>
  (urls: string[], options?: PingUrlOptions): Promise<IsReachableResult[]>
  (urls: string, options?: PingUrlOptions): Promise<IsReachableResult>
  (keyOpts: MemoizeOptions, memoOpts?: MemoizeOptions): ReturnType<typeof import('lodash')>
}

declare namespace pingUrl {
  export function isReachable(url: string, options?: ReachableUrlOptions): Promise<boolean>
  export function isStream(input: unknown): boolean
}

export default pingUrl
