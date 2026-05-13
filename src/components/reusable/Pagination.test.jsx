import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CssVarsProvider } from "@mui/joy";
import { Pagination } from "./Pagination";

function renderPagination(props) {
    return render(
        <CssVarsProvider>
            <Pagination {...props} />
        </CssVarsProvider>
    );
}

const baseProps = {
    currentPage: 2,
    totalPages: 5,
    handleChangePage: jest.fn(),
    handleChangeCount: jest.fn(),
    count: 25,
};

describe("Pagination", () => {
    test("renders the current page and total pages", () => {
        renderPagination(baseProps);
        expect(screen.getByText("Page 2 / 5")).toBeInTheDocument();
    });

    test("disables the Previous button on the first page", () => {
        renderPagination({ ...baseProps, currentPage: 1 });
        expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
    });

    test("disables the Next button on the last page", () => {
        renderPagination({ ...baseProps, currentPage: 5, totalPages: 5 });
        expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();
    });

    test("disables both buttons when there is only one page", () => {
        renderPagination({ ...baseProps, currentPage: 1, totalPages: 1 });
        expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });

    test("clicking Previous calls handleChangePage with currentPage - 1", async () => {
        const handleChangePage = jest.fn();
        renderPagination({ ...baseProps, handleChangePage });

        await userEvent.click(screen.getByRole("button", { name: /previous/i }));
        expect(handleChangePage).toHaveBeenCalledWith(1);
    });

    test("clicking Next calls handleChangePage with currentPage + 1", async () => {
        const handleChangePage = jest.fn();
        renderPagination({ ...baseProps, handleChangePage });

        await userEvent.click(screen.getByRole("button", { name: /next/i }));
        expect(handleChangePage).toHaveBeenCalledWith(3);
    });
});
