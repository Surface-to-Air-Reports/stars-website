import { powerSearchOwners } from "./powerSearchOwners";

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

function emptyResponse() {
    return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [], total_pages: 0, total_results: 0 }),
    };
}

describe("powerSearchOwners", () => {
    test("queries the owners endpoint with default ordering and the requested page size", async () => {
        global.fetch.mockResolvedValue(emptyResponse());

        await powerSearchOwners(20, 0);

        const url = global.fetch.mock.calls[0][0];
        expect(url).toMatch(/\/owners\?/);
        expect(url).toMatch(/page_size=20/);
        expect(url).toMatch(/order=desc/);
        expect(url).not.toMatch(/page=/);
    });

    test("forwards page when provided and non-zero", async () => {
        global.fetch.mockResolvedValue(emptyResponse());

        await powerSearchOwners(20, 5);

        expect(global.fetch.mock.calls[0][0]).toMatch(/page=5/);
    });

    test("maps API rows into the simplified owner shape and exposes totals", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            statusText: "OK",
            json: async () => ({
                data: [
                    {
                        callsigns: ["N1", "N2"],
                        name: "Skyline Charter",
                        total_violated_seconds: 4242,
                        extra: "ignored",
                    },
                ],
                total_pages: 2,
                total_results: 50,
            }),
        });

        const result = await powerSearchOwners(20, 1);

        expect(result).toEqual({
            top: [
                {
                    callsigns: ["N1", "N2"],
                    name: "Skyline Charter",
                    total_violated_seconds: 4242,
                },
            ],
            total: 2,
            totalSessions: 50,
        });
    });
});
