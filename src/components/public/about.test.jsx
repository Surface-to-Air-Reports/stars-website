import React from "react";
import { render, screen } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy";
import About from "./about";

function renderAbout() {
    return render(
        <CssVarsProvider>
            <About />
        </CssVarsProvider>
    );
}

describe("About page", () => {
    test("renders the headline", () => {
        renderAbout();
        expect(
            screen.getByRole("heading", { level: 1 })
        ).toHaveTextContent(/aviation safety/i);
    });

    test("mentions the Rocky Mountain Metropolitan Airport", () => {
        renderAbout();
        expect(
            screen.getByText(/Rocky Mountain Metropolitan/i)
        ).toBeInTheDocument();
    });

    test("renders the project logo", () => {
        renderAbout();
        expect(screen.getByAltText("logo")).toBeInTheDocument();
    });
});
