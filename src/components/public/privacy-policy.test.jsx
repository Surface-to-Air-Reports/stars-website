import React from "react";
import { render, screen } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy";
import PrivacyPolicy from "./privacy-policy";

function renderPrivacy() {
    return render(
        <CssVarsProvider>
            <PrivacyPolicy />
        </CssVarsProvider>
    );
}

describe("Privacy Policy page", () => {
    test("renders the page heading", () => {
        renderPrivacy();
        expect(
            screen.getByRole("heading", { level: 1, name: /privacy policy/i })
        ).toBeInTheDocument();
    });

    test("includes a contact email", () => {
        renderPrivacy();
        expect(screen.getByText(/starscolorado@protonmail\.com/i)).toBeInTheDocument();
    });

    test("renders all numbered sections", () => {
        renderPrivacy();
        for (let i = 1; i <= 10; i++) {
            expect(
                screen.getByRole("heading", { level: 3, name: new RegExp(`^\\s*${i}\\.`) })
            ).toBeInTheDocument();
        }
    });
});
