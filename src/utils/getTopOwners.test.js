import { getTopOwners } from "./getTopOwners";
import { cachedFetch } from "./cachedFetch";

jest.mock("./cachedFetch", () => ({
    cachedFetch: jest.fn(),
}));

describe("getTopOwners", () => {
    beforeEach(() => {
        cachedFetch.mockReset();
    });

    test("queries the owners endpoint with the requested page size", async () => {
        cachedFetch.mockResolvedValue({ data: [] });

        await getTopOwners(7);

        const url = cachedFetch.mock.calls[0][0];
        expect(url).toMatch(/\/owners\?/);
        expect(url).toMatch(/sort_by=total_violated_seconds/);
        expect(url).toMatch(/order=desc/);
        expect(url).toMatch(/page_size=7/);
    });

    test("maps API rows into the simplified owner shape", async () => {
        cachedFetch.mockResolvedValue({
            data: [
                {
                    name: "Skyline Charter",
                    total_violated_seconds: 999,
                    callsigns: ["N100AA", "N101AA"],
                    callsign_count: 2,
                    extra: "drop me",
                },
            ],
        });

        const result = await getTopOwners(1);

        expect(result).toEqual([
            {
                name: "Skyline Charter",
                total_violated_seconds: 999,
                callsigns: ["N100AA", "N101AA"],
                callsign_count: 2,
            },
        ]);
    });
});
