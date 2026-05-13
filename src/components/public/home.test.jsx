import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy";
import Home from "./home";
import * as getStats from "../../utils/getStats";

jest.mock("../../utils/getStats");

function renderHome() {
    return render(
        <CssVarsProvider>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </CssVarsProvider>
    );
}

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Home page", () => {
    test("renders the formatted low-altitude time once stats resolve", async () => {
        getStats.getGenStats.mockResolvedValue({
            lowtime: 3661,
            lastUpdated: "2026-01-15T12:00:00Z",
        });

        renderHome();

        await waitFor(() =>
            expect(screen.getByText("1h 1m 1s")).toBeInTheDocument()
        );
    });

    test("formats the last updated timestamp", async () => {
        getStats.getGenStats.mockResolvedValue({
            lowtime: 0,
            lastUpdated: "2026-01-15T12:00:00Z",
        });

        renderHome();

        await waitFor(() =>
            expect(screen.getByText(/Updated January 15, 2026/i)).toBeInTheDocument()
        );
    });

    test("renders both call-to-action buttons", async () => {
        getStats.getGenStats.mockResolvedValue({
            lowtime: 60,
            lastUpdated: "2026-01-15T12:00:00Z",
        });

        renderHome();

        expect(screen.getByRole("link", { name: /file a report/i })).toHaveAttribute(
            "href",
            expect.stringMatching(/ancir\.faa\.gov/)
        );
        expect(screen.getByRole("button", { name: /view data/i })).toBeInTheDocument();
    });

    test("hides the 'Updated' label when lastUpdated is missing", async () => {
        getStats.getGenStats.mockResolvedValue({ lowtime: 30 });

        renderHome();

        await waitFor(() =>
            expect(screen.getByText("30s")).toBeInTheDocument()
        );

        expect(screen.queryByText(/^Updated /i)).not.toBeInTheDocument();
    });
});
