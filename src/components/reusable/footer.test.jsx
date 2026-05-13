import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy";
import Footer from "./footer";

function renderFooter() {
    return render(
        <CssVarsProvider>
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        </CssVarsProvider>
    );
}

describe("Footer", () => {
    test("renders the footer landmark", () => {
        renderFooter();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    test("renders the project logo", () => {
        renderFooter();
        expect(screen.getByAltText("Logo")).toBeInTheDocument();
    });

    test("renders About, Methodology, Terms, Privacy and GitHub links", () => {
        renderFooter();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Methodology")).toBeInTheDocument();
        expect(screen.getByText("Terms of Use")).toBeInTheDocument();
        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
        expect(screen.getByText("GitHub")).toBeInTheDocument();
    });

    test("GitHub link points at the project organisation", () => {
        renderFooter();
        const github = screen.getByText("GitHub").closest("a");
        expect(github).toHaveAttribute(
            "href",
            "https://github.com/Surface-to-Air-Reports"
        );
    });
});
