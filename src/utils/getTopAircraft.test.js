import { getTopAircraft } from "./getTopAircraft";
import { cachedFetch } from "./cachedFetch";

jest.mock("./cachedFetch", () => ({
    cachedFetch: jest.fn(),
}));

describe("getTopAircraft", () => {
    beforeEach(() => {
        cachedFetch.mockReset();
    });

    test("queries the aircraft endpoint with the requested page size and ordering", async () => {
        cachedFetch.mockResolvedValue({ data: [] });

        await getTopAircraft(15);

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/\/aircraft\?/);
        expect(url).toMatch(/sort_by=total_violated_seconds/);
        expect(url).toMatch(/order=desc/);
        expect(url).toMatch(/page_size=15/);
    });

    test("maps API rows into the simplified aircraft shape", async () => {
        cachedFetch.mockResolvedValue({
            data: [
                {
                    callsign: "N12345",
                    lowest_altitude: 350,
                    total_violated_seconds: 1234,
                    owner: "Acme Aviation",
                    aircraft_type: "C172",
                    session_count: 4,
                    extraneous: "ignored",
                },
            ],
        });

        const result = await getTopAircraft(1);

        expect(result).toEqual([
            {
                callsign: "N12345",
                lowest_altitude: 350,
                total_violated_seconds: 1234,
                owner_name: "Acme Aviation",
                type: "C172",
                session_count: 4,
            },
        ]);
    });

    test("returns an empty array when API returns no rows", async () => {
        cachedFetch.mockResolvedValue({ data: [] });
        const result = await getTopAircraft(5);
        expect(result).toEqual([]);
    });
});
