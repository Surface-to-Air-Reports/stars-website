import { getSessionsByDate } from "./getSessionsByDate";
import { cachedFetch, DEFAULT_TTL_MS, THIRTY_DAYS_MS } from "./cachedFetch";

jest.mock("./cachedFetch", () => {
    const actual = jest.requireActual("./cachedFetch");
    return {
        ...actual,
        cachedFetch: jest.fn(),
    };
});

function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function futureDateStr() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

beforeEach(() => {
    cachedFetch.mockReset();
});

describe("getSessionsByDate", () => {
    test("requests the configured time window and page size", async () => {
        cachedFetch.mockResolvedValue({ data: [], total: 0 });

        await getSessionsByDate("2025-01-15");

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/time_start=2025-01-15T00%3A00%3A00/);
        expect(url).toMatch(/time_end=2025-01-15T23%3A59%3A59/);
        expect(url).toMatch(/page_size=50/);
        expect(url).toMatch(/sort_by=session_start/);
        expect(url).toMatch(/order=asc/);
    });

    test("uses the long TTL for past dates", async () => {
        cachedFetch.mockResolvedValue({ data: [], total: 0 });

        await getSessionsByDate("2020-01-01");

        const opts = cachedFetch.mock.calls[0][1];
        expect(opts.ttl).toBe(THIRTY_DAYS_MS);
    });

    test("uses the default TTL for today and future dates", async () => {
        cachedFetch.mockResolvedValue({ data: [], total: 0 });

        await getSessionsByDate(todayStr());
        await getSessionsByDate(futureDateStr());

        expect(cachedFetch.mock.calls[0][1].ttl).toBe(DEFAULT_TTL_MS);
        expect(cachedFetch.mock.calls[1][1].ttl).toBe(DEFAULT_TTL_MS);
    });

    test("paginates until a short page is returned, concatenating results", async () => {
        const fullPage = Array.from({ length: 50 }, (_, i) => ({ id: i }));
        const lastPage = [{ id: 99 }];

        cachedFetch
            .mockResolvedValueOnce({ data: fullPage, total: 51 })
            .mockResolvedValueOnce({ data: lastPage, total: 51 });

        const result = await getSessionsByDate("2025-01-15");

        expect(result.sessions).toHaveLength(51);
        expect(cachedFetch).toHaveBeenCalledTimes(2);

        // page param should advance
        expect(cachedFetch.mock.calls[0][0]).toMatch(/page=1/);
        expect(cachedFetch.mock.calls[1][0]).toMatch(/page=2/);
    });

    test("returns unix timestamps for the day boundaries", async () => {
        cachedFetch.mockResolvedValue({ data: [], total: 0 });

        const result = await getSessionsByDate("2025-01-15");

        expect(result.startTs).toBe(new Date("2025-01-15T00:00:00").getTime() / 1000);
        expect(result.endTs).toBe(new Date("2025-01-15T23:59:59").getTime() / 1000);
    });

    test("stops paginating when the total is reached even on a full page", async () => {
        const fullPage = Array.from({ length: 50 }, (_, i) => ({ id: i }));

        cachedFetch.mockResolvedValueOnce({ data: fullPage, total: 50 });

        const result = await getSessionsByDate("2025-01-15");

        expect(result.sessions).toHaveLength(50);
        expect(cachedFetch).toHaveBeenCalledTimes(1);
    });
});
