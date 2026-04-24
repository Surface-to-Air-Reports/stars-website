const CACHE_PREFIX = "stars_cache:";
const DEFAULT_TTL_MS = 30 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function makeKey(url) {
    return CACHE_PREFIX + url;
}

function readCache(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function writeCache(key, entry) {
    try {
        localStorage.setItem(key, JSON.stringify(entry));
    } catch (err) {
        if (err && err.name === "QuotaExceededError") {
            evictExpired();
            try {
                localStorage.setItem(key, JSON.stringify(entry));
            } catch {
                // give up silently, cache is best-effort
            }
        }
    }
}

function isFresh(entry, ttl) {
    if (!entry) return false;
    if (entry.expiresAt === null) return true;
    if (typeof ttl === "number" && ttl !== entry.ttl) return false;
    return Date.now() < entry.expiresAt;
}

function evictExpired() {
    const now = Date.now();
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith(CACHE_PREFIX)) continue;
        const entry = readCache(k);
        if (entry && entry.expiresAt !== null && entry.expiresAt < now) {
            localStorage.removeItem(k);
        }
    }
}

async function cachedFetch(url, options = {}) {
    const { ttl = DEFAULT_TTL_MS, permanent = false, fetchOptions } = options;
    const key = makeKey(url);

    const entry = readCache(key);
    if (isFresh(entry, permanent ? null : ttl)) {
        return entry.data;
    }

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
        throw new Error(`cachedFetch: ${res.status} ${res.statusText} for ${url}`);
    }
    const data = await res.json();

    writeCache(key, {
        data,
        ttl: permanent ? null : ttl,
        expiresAt: permanent ? null : Date.now() + ttl,
        cachedAt: Date.now(),
    });

    return data;
}

function invalidate(urlOrPrefix) {
    const key = makeKey(urlOrPrefix);
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(key)) {
            localStorage.removeItem(k);
        }
    }
}

function clearAll() {
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_PREFIX)) {
            localStorage.removeItem(k);
        }
    }
}

export { cachedFetch, invalidate, clearAll, DEFAULT_TTL_MS, THIRTY_DAYS_MS };
