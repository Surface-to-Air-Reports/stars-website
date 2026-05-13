import { getGenStats, getFrequencyStats, getAltitudeStats } from "./getStats";
import { cachedFetch } from "./cachedFetch";

jest.mock("./cachedFetch", () => ({
    cachedFetch: jest.fn(),
}));

describe("getGenStats", () => {
    beforeEach(() => {
        cachedFetch.mockReset();
    });

    test("requests both fields and maps them to a friendly shape", async () => {
        cachedFetch.mockResolvedValue({
            total_violated_seconds: 7200,
            last_updated: "2026-01-15T12:00:00Z",
        });

        const result = await getGenStats();

        expect(result).toEqual({
            lowtime: 7200,
            lastUpdated: "2026-01-15T12:00:00Z",
        });
        expect(cachedFetch).toHaveBeenCalledTimes(1);
        const calledUrl = cachedFetch.mock.calls[0][0];
        expect(calledUrl).toMatch(/fields=total_violated_seconds/);
        expect(calledUrl).toMatch(/fields=last_updated/);
    });
});

describe("getFrequencyStats", () => {
    beforeEach(() => {
        cachedFetch.mockReset();
    });

    test("returns the hourly_violations field from the API response", async () => {
        const buckets = [1, 2, 3];
        cachedFetch.mockResolvedValue({ hourly_violations: buckets });

        const result = await getFrequencyStats();

        expect(result).toBe(buckets);
        expect(cachedFetch.mock.calls[0][0]).toMatch(/fields=hourly_violations/);
    });
});

describe("getAltitudeStats", () => {
    beforeEach(() => {
        cachedFetch.mockReset();
    });

    test("returns the altitude_violations field from the API response", async () => {
        const buckets = [{ alt: 100, count: 4 }];
        cachedFetch.mockResolvedValue({ altitude_violations: buckets });

        const result = await getAltitudeStats();

        expect(result).toBe(buckets);
        expect(cachedFetch.mock.calls[0][0]).toMatch(/fields=altitude_violations/);
    });
});
