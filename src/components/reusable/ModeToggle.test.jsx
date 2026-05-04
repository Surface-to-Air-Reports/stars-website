import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CssVarsProvider } from "@mui/joy";
import ModeToggle from "./ModeToggle";

function renderToggle(initialMode = "light") {
    return render(
        <CssVarsProvider defaultMode={initialMode}>
            <ModeToggle />
        </CssVarsProvider>
    );
}

beforeEach(() => {
    localStorage.clear();
});

describe("ModeToggle", () => {
    test("renders an icon once mounted (not null after effect)", async () => {
        renderToggle("light");
        // Light icon shown
        expect(await screen.findByTestId("LightModeIcon")).toBeInTheDocument();
    });

    test("clicking the toggle in light mode swaps to dark mode", async () => {
        renderToggle("light");

        const card = (await screen.findByTestId("LightModeIcon")).closest("div");
        await userEvent.click(card);

        // After toggle, the dark icon should be shown
        expect(await screen.findByTestId("DarkModeIcon")).toBeInTheDocument();
    });

    test("clicking the toggle in dark mode swaps back to light mode", async () => {
        renderToggle("dark");

        const card = (await screen.findByTestId("DarkModeIcon")).closest("div");
        await userEvent.click(card);

        expect(await screen.findByTestId("LightModeIcon")).toBeInTheDocument();
    });
});
