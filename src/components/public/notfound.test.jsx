import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./notfound";

describe("NotFound page", () => {
    test("renders a 404 message in a heading", () => {
        render(<NotFound />);
        expect(screen.getByRole("heading")).toHaveTextContent(/404/);
    });
});
