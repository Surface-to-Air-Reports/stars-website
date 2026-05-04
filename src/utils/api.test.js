describe("API_BASE_URL", () => {
    const originalEnv = process.env.REACT_APP_API_BASE_URL;

    afterEach(() => {
        if (originalEnv === undefined) {
            delete process.env.REACT_APP_API_BASE_URL;
        } else {
            process.env.REACT_APP_API_BASE_URL = originalEnv;
        }
        jest.resetModules();
    });

    test("falls back to production URL when env var is unset", () => {
        delete process.env.REACT_APP_API_BASE_URL;
        jest.resetModules();
        const { API_BASE_URL } = require("./api");
        expect(API_BASE_URL).toBe("https://api.stars80027.com");
    });

    test("uses REACT_APP_API_BASE_URL when set", () => {
        process.env.REACT_APP_API_BASE_URL = "https://staging.example.com";
        jest.resetModules();
        const { API_BASE_URL } = require("./api");
        expect(API_BASE_URL).toBe("https://staging.example.com");
    });
});
