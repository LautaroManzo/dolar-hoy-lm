const DEFAULT_MAX_IPS = 500;

interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  maxIps?: number;
}

export function createRateLimiter({ limit, windowMs, maxIps = DEFAULT_MAX_IPS }: RateLimiterOptions) {
  const ipLog = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();

    for (const [key, times] of ipLog) {
      const valid = times.filter(t => now - t < windowMs);
      if (valid.length === 0) ipLog.delete(key);
      else ipLog.set(key, valid);
    }

    if (ipLog.size >= maxIps && !ipLog.has(ip)) {
      let oldestKey = '';
      let oldestTime = Infinity;
      for (const [key, times] of ipLog) {
        const latest = Math.max(...times);
        if (latest < oldestTime) {
          oldestTime = latest;
          oldestKey = key;
        }
      }
      if (oldestKey) ipLog.delete(oldestKey);
    }

    const timestamps = ipLog.get(ip) ?? [];
    if (timestamps.length >= limit) return true;
    ipLog.set(ip, [...timestamps, now]);
    return false;
  };
}
