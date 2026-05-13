import { secToDurationShort } from "./secToDurationShort";

describe("secToDurationShort", () => {
    test("returns only seconds when below one minute", () => {
        expect(secToDurationShort(45)).toBe("45s");
    });

    test("returns 0s for zero", () => {
        expect(secToDurationShort(0)).toBe("0s");
    });

    test("returns minutes and seconds when below one hour", () => {
        expect(secToDurationShort(125)).toBe("2m 5s");
    });

    test("returns hours, minutes and seconds when above one hour", () => {
        // 1h 1m 1s
        expect(secToDurationShort(3661)).toBe("1h 1m 1s");
    });

    test("does not pad single-digit minutes or seconds", () => {
        expect(secToDurationShort(65)).toBe("1m 5s");
    });

    test("accepts numeric strings (parses input)", () => {
        expect(secToDurationShort("3661")).toBe("1h 1m 1s");
    });

    test("omits hours when only minutes are present", () => {
        expect(secToDurationShort(60)).toBe("1m 0s");
    });

    test("handles large values correctly", () => {
        // 100h 0m 0s = 360000s
        expect(secToDurationShort(360000)).toBe("100h 0m 0s");
    });
});
