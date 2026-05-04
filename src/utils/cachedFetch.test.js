import {
    cachedFetch,
    invalidate,
    clearAll,
    DEFAULT_TTL_MS,
    THIRTY_DAYS_MS,
} from "./cachedFetch";

const PREFIX = "stars_cache:";

function makeOkResponse(json) {
    return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => json,
    };
}

function makeErrorResponse(status, statusText) {
    return {
        ok: false,
        status,
        statusText,
        json: async () => ({}),
    };
}

beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
});

describe("cachedFetch", () => {
    test("constants expose expected TTL values", () => {
        expect(DEFAULT_TTL_MS).toBe(30 * 60 * 1000);
        expect(THIRTY_DAYS_MS).toBe(30 * 24 * 60 * 60 * 1000);
    });

    test("hits the network on first call and stores the response", async () => {
        const payload = { hello: "world" };
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse(payload));

        const result = await cachedFetch("https://api.test/foo");

        expect(result).toEqual(payload);
        expect(global.fetch).toHaveBeenCalledTimes(1);

        const stored = JSON.parse(localStorage.getItem(PREFIX + "https://api.test/foo"));
        expect(stored.data).toEqual(payload);
        expect(stored.ttl).toBe(DEFAULT_TTL_MS);
        expect(typeof stored.expiresAt).toBe("number");
    });

    test("returns cached data without re-fetching when fresh", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({ a: 1 }));

        await cachedFetch("https://api.test/x");
        await cachedFetch("https://api.test/x");
        await cachedFetch("https://api.test/x");

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test("re-fetches when the cache entry has expired", async () => {
        global.fetch = jest
            .fn()
            .mockResolvedValueOnce(makeOkResponse({ v: 1 }))
            .mockResolvedValueOnce(makeOkResponse({ v: 2 }));

        const url = "https://api.test/expire";
        const r1 = await cachedFetch(url, { ttl: 1000 });

        // Force expiry by editing the stored entry
        const key = PREFIX + url;
        const entry = JSON.parse(localStorage.getItem(key));
        entry.expiresAt = Date.now() - 1;
        localStorage.setItem(key, JSON.stringify(entry));

        const r2 = await cachedFetch(url, { ttl: 1000 });

        expect(r1).toEqual({ v: 1 });
        expect(r2).toEqual({ v: 2 });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test("re-fetches when the requested ttl differs from the cached ttl", async () => {
        global.fetch = jest
            .fn()
            .mockResolvedValueOnce(makeOkResponse({ v: 1 }))
            .mockResolvedValueOnce(makeOkResponse({ v: 2 }));

        await cachedFetch("https://api.test/ttl", { ttl: 1000 });
        const r2 = await cachedFetch("https://api.test/ttl", { ttl: 5000 });

        expect(r2).toEqual({ v: 2 });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test("permanent: true never expires and is reused", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({ p: true }));

        await cachedFetch("https://api.test/perm", { permanent: true });
        await cachedFetch("https://api.test/perm", { permanent: true });

        expect(global.fetch).toHaveBeenCalledTimes(1);

        const stored = JSON.parse(localStorage.getItem(PREFIX + "https://api.test/perm"));
        expect(stored.expiresAt).toBeNull();
        expect(stored.ttl).toBeNull();
    });

    test("throws on non-OK responses", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeErrorResponse(500, "Server Error"));

        await expect(cachedFetch("https://api.test/bad")).rejects.toThrow(/500/);
    });

    test("forwards fetchOptions to fetch", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({}));

        await cachedFetch("https://api.test/h", {
            fetchOptions: { headers: { accept: "application/json" } },
        });

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.test/h",
            { headers: { accept: "application/json" } }
        );
    });

    test("ignores corrupted cache entries and re-fetches", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({ ok: 1 }));
        localStorage.setItem(PREFIX + "https://api.test/corrupt", "{not json");

        const result = await cachedFetch("https://api.test/corrupt");

        expect(result).toEqual({ ok: 1 });
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});

describe("invalidate", () => {
    test("removes entries that match the given URL prefix", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({ x: 1 }));
        await cachedFetch("https://api.test/users/1");
        await cachedFetch("https://api.test/users/2");
        await cachedFetch("https://api.test/other");

        invalidate("https://api.test/users");

        expect(localStorage.getItem(PREFIX + "https://api.test/users/1")).toBeNull();
        expect(localStorage.getItem(PREFIX + "https://api.test/users/2")).toBeNull();
        expect(localStorage.getItem(PREFIX + "https://api.test/other")).not.toBeNull();
    });
});

describe("clearAll", () => {
    test("removes only stars_cache entries, leaves others intact", async () => {
        global.fetch = jest.fn().mockResolvedValue(makeOkResponse({}));
        await cachedFetch("https://api.test/a");
        localStorage.setItem("unrelated", "keep me");

        clearAll();

        expect(localStorage.getItem(PREFIX + "https://api.test/a")).toBeNull();
        expect(localStorage.getItem("unrelated")).toBe("keep me");
    });
});
