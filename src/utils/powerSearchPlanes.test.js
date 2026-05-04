import { powerSearchPlanes } from "./powerSearchPlanes";
import { cachedFetch } from "./cachedFetch";

jest.mock("./cachedFetch", () => ({
    cachedFetch: jest.fn(),
}));

beforeEach(() => {
    cachedFetch.mockReset();
});

function emptyResponse() {
    return { data: [], total_pages: 0, total_results: 0 };
}

describe("powerSearchPlanes", () => {
    test("sets default page_size and order on the aircraft endpoint", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchPlanes(25, "", 0, "");

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/\/aircraft\?/);
        expect(url).toMatch(/page_size=25/);
        expect(url).toMatch(/order=desc/);
        expect(url).not.toMatch(/sort_by=/);
        expect(url).not.toMatch(/page=/);
        expect(url).not.toMatch(/owner=/);
    });

    test("ascending order is applied when sorting by lowest_altitude", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchPlanes(10, "lowest_altitude", 0, "");

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/sort_by=lowest_altitude/);
        expect(url).toMatch(/order=asc/);
    });

    test("descending order is applied when sorting by total_violated_seconds", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchPlanes(10, "total_violated_seconds", 0, "");

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/sort_by=total_violated_seconds/);
        expect(url).toMatch(/order=desc/);
    });

    test("page and owner params are forwarded when provided", async () => {
        cachedFetch.mockResolvedValue(emptyResponse());

        await powerSearchPlanes(25, "", 3, "Acme");

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/page=3/);
        expect(url).toMatch(/owner=Acme/);
    });

    test("maps API rows and surfaces total / totalSessions metadata", async () => {
        cachedFetch.mockResolvedValue({
            data: [
                {
                    callsign: "N12345",
                    owner: "Owner A",
                    aircraft_type: "C172",
                    total_violated_seconds: 12,
                    lowest_altitude: 200,
                    session_count: 1,
                    extra: "ignored",
                },
            ],
            total_pages: 4,
            total_results: 100,
        });

        const result = await powerSearchPlanes(25, "", 1, "");

        expect(result).toEqual({
            top: [
                {
                    callsign: "N12345",
                    owner: "Owner A",
                    aircraft_type: "C172",
                    total_violated_seconds: 12,
                    lowest_altitude: 200,
                    session_count: 1,
                },
            ],
            total: 4,
            totalSessions: 100,
        });
    });
});
