import { powerSearchLowSessions } from "./powerSearchLowSessions";
import { cachedFetch, DEFAULT_TTL_MS, THIRTY_DAYS_MS } from "./cachedFetch";

jest.mock("./cachedFetch", () => {
    const actual = jest.requireActual("./cachedFetch");
    return {
        ...actual,
        cachedFetch: jest.fn(),
    };
});

beforeEach(() => {
    cachedFetch.mockReset();
});

function emptyResponse() {
    return { data: [], total_pages: 0, total_results: 0 };
}

describe("powerSearchLowSessions", () => {
    test("sets defaults and forwards date_start / date_end", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchLowSessions(
            25, "", 0, 0, 0, 0,
            "2025-01-01T00:00:00Z",
            "2025-01-02T00:00:00Z",
            "",
            0
        );

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/\/sessions\?/);
        expect(url).toMatch(/page_size=25/);
        expect(url).toMatch(/sort_by=session_start/);
        expect(url).toMatch(/order=desc/);
        expect(url).toMatch(/time_start=/);
        expect(url).toMatch(/time_end=/);
    });

    test("includes filter params only when truthy", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchLowSessions(
            25, "N123", 500, 100, 60, 600,
            "2025-01-01T00:00:00Z",
            "2025-01-02T00:00:00Z",
            "",
            2
        );

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/callsign=N123/);
        expect(url).toMatch(/min_altitude=100/);
        expect(url).toMatch(/max_altitude=500/);
        expect(url).toMatch(/min_duration=60/);
        expect(url).toMatch(/max_duration=600/);
        expect(url).toMatch(/page=2/);
    });

    test("flips order to ascending when sorting by lowest_altitude", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchLowSessions(
            25, "", 0, 0, 0, 0,
            "2025-01-01T00:00:00Z",
            "2025-01-02T00:00:00Z",
            "lowest_altitude",
            0
        );

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/sort_by=lowest_altitude/);
        expect(url).toMatch(/order=asc/);
    });

    test("uses the long TTL when date_end is in the past", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchLowSessions(
            25, "", 0, 0, 0, 0,
            "2020-01-01T00:00:00Z",
            "2020-01-02T00:00:00Z",
            "",
            0
        );

        expect(cachedFetch.mock.calls[0][1].ttl).toBe(THIRTY_DAYS_MS);
    });

    test("uses the default TTL when date_end is in the future", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        const future = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        await powerSearchLowSessions(
            25, "", 0, 0, 0, 0,
            new Date().toISOString(),
            future,
            "",
            0
        );

        expect(cachedFetch.mock.calls[0][1].ttl).toBe(DEFAULT_TTL_MS);
    });

    test("converts session_start strings into Date instances and exposes totals", async () => {
        cachedFetch.mockResolvedValue({
            data: [
                {
                    callsign: "N1",
                    session_start: "2025-01-01T05:00:00Z",
                    lowest_altitude: 200,
                    violating_duration_seconds: 90,
                    owner: "Acme",
                    aircraft_type: "C172",
                    pings: 12,
                    extra: "ignored",
                },
            ],
            total_pages: 5,
            total_results: 200,
        });

        const result = await powerSearchLowSessions(
            25, "", 0, 0, 0, 0,
            "2025-01-01T00:00:00Z",
            "2025-01-02T00:00:00Z",
            "",
            0
        );

        expect(result.total).toBe(5);
        expect(result.totalSessions).toBe(200);
        expect(result.top).toHaveLength(1);
        expect(result.top[0].session_start).toBeInstanceOf(Date);
        expect(result.top[0].violating_duration).toBe(90);
        expect(result.top[0].callsign).toBe("N1");
    });
});
