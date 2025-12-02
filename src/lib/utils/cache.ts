interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > entry.ttl * 1000) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function saveToCache<T>(
  key: string,
  data: T,
  options: { ttl: number }
) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: options.ttl,
  });
}

export function clearCache() {
  cache.clear();
}

export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
}

export function cleanExpiredCache() {
  const now = Date.now();
  let cleanedCount = 0;

  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl * 1000) {
      cache.delete(key);
      cleanedCount++;
    }
  }

  if (cleanedCount > 0) {
    console.log(`[Cache] Cleaned ${cleanedCount} expired entries`);
  }

  return cleanedCount;
}

// Auto-cleanup every 5 minutes (only in server environment)
if (typeof window === 'undefined') {
  setInterval(cleanExpiredCache, 300000);
}
