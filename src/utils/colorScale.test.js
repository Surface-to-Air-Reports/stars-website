import { colorScale, colorScaleInverse } from "./colorScale";

describe("colorScale", () => {
    test("returns 'success' below the medium threshold", () => {
        expect(colorScale(5, 10, 20)).toBe("success");
    });

    test("returns 'success' exactly at the medium threshold (strict greater-than)", () => {
        expect(colorScale(10, 10, 20)).toBe("success");
    });

    test("returns 'warning' above medium but below bad", () => {
        expect(colorScale(15, 10, 20)).toBe("warning");
    });

    test("returns 'warning' exactly at the bad threshold", () => {
        expect(colorScale(20, 10, 20)).toBe("warning");
    });

    test("returns 'danger' above the bad threshold", () => {
        expect(colorScale(25, 10, 20)).toBe("danger");
    });

    test("handles negative values as 'success'", () => {
        expect(colorScale(-1, 0, 5)).toBe("success");
    });
});

describe("colorScaleInverse", () => {
    test("returns 'success' above the medium threshold", () => {
        expect(colorScaleInverse(25, 20, 10)).toBe("success");
    });

    test("returns 'success' exactly at the medium threshold (strict less-than)", () => {
        expect(colorScaleInverse(20, 20, 10)).toBe("success");
    });

    test("returns 'warning' below medium but above bad", () => {
        expect(colorScaleInverse(15, 20, 10)).toBe("warning");
    });

    test("returns 'warning' exactly at the bad threshold", () => {
        expect(colorScaleInverse(10, 20, 10)).toBe("warning");
    });

    test("returns 'danger' below the bad threshold", () => {
        expect(colorScaleInverse(5, 20, 10)).toBe("danger");
    });
});
