import { secToDuration } from "./secToDuration";

describe("secToDuration", () => {
    test("formats zero seconds as 0h 00m 00s", () => {
        expect(secToDuration(0)).toBe("0h 00m 00s");
    });

    test("pads single-digit seconds with a leading zero", () => {
        expect(secToDuration(5)).toBe("0h 00m 05s");
    });

    test("pads single-digit minutes with a leading zero", () => {
        expect(secToDuration(65)).toBe("0h 01m 05s");
    });

    test("does not pad the hours component", () => {
        expect(secToDuration(3600)).toBe("1h 00m 00s");
    });

    test("formats a value spanning hours, minutes and seconds", () => {
        // 1h 1m 1s = 3661 seconds
        expect(secToDuration(3661)).toBe("1h 01m 01s");
    });

    test("handles double-digit hours without truncation", () => {
        // 25h 30m 45s = 91845 seconds
        expect(secToDuration(91845)).toBe("25h 30m 45s");
    });

    test("rolls 60 seconds into the next minute", () => {
        expect(secToDuration(60)).toBe("0h 01m 00s");
    });

    test("rolls 3600 seconds into the next hour", () => {
        expect(secToDuration(3600)).toBe("1h 00m 00s");
    });
});
