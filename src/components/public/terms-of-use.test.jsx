import React from "react";
import { render, screen } from "@testing-library/react";
import { CssVarsProvider } from "@mui/joy";
import TermsOfUse from "./terms-of-use";

function renderTerms() {
    return render(
        <CssVarsProvider>
            <TermsOfUse />
        </CssVarsProvider>
    );
}

describe("Terms of Use page", () => {
    test("renders a Terms of Use heading", () => {
        renderTerms();
        expect(
            screen.getByRole("heading", { level: 1, name: /terms of use/i })
        ).toBeInTheDocument();
    });

    test("renders all numbered sections", () => {
        renderTerms();
        const expectedSections = [
            /1\. Project Purpose/i,
            /2\. Nature of the Data/i,
            /3\. No Regulatory Determinations/i,
            /4\. Not for Operational Aviation Use/i,
            /5\. License and Attribution/i,
            /6\. Responsible Use/i,
            /7\. Limitation of Liability/i,
        ];
        for (const re of expectedSections) {
            expect(screen.getByRole("heading", { level: 3, name: re })).toBeInTheDocument();
        }
    });

    test("references the AGPL-3.0 license", () => {
        renderTerms();
        expect(screen.getByText(/AGPL-3\.0/i)).toBeInTheDocument();
    });
});
