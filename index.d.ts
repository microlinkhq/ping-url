import { ReachableUrlOptions, IsReachableResult } from 'reachable-url'

export interface PingUrlOptions {
  /**
   * Options for the memoize function (keyv-memoize)
   */
  keyOpts?: {
    /**
     * The cache key to use
     */
    key?: string
    /**
     * Cache storage adapter
     */
    store?: any
  }
  /**
   * Options for memoization
   */
  memoOpts?: {
    /**
     * Time to live in milliseconds
     */
    ttl?: number
    /**
     * Cache on disk
     */
    disk?: boolean
    /**
     * Serialize function
     */
    serialize?: (value: any) => any
    /**
     * Deserialize function
     */
    deserialize?: (value: any) => any
  }
}

/**
 * Check if a URL is reachable with DNS resolution, following redirects, etc.
 * Results are memoized for performance.
 * 
 * @param url - The URL to check
 * @param options - Options for the ping and memoization
 * @returns Promise resolving to URL info or null if not reachable
 */
export default function pingUrl(
  url: string,
  options?: PingUrlOptions
): Promise<IsReachableResult>

/**
 * Check if a URL is directly reachable without memoization.
 * 
 * @param url - The URL to check
 * @param options - Options for the check
 * @returns Promise resolving to URL info or null if not reachable
 */
export function isReachable(
  url: string,
  options?: ReachableUrlOptions
): Promise<IsReachableResult>

/**
 * Check if a value is a stream.
 * 
 * @param input - The value to check
 * @returns True if the value is a stream
 */
export function isStream(input: any): input is NodeJS.ReadableStream
