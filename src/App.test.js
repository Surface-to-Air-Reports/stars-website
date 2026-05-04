import { render, screen } from "@testing-library/react";

// jsdom doesn't implement window.scrollTo; the header/footer call it on every
// route change. Stub it before App imports anything.
window.scrollTo = jest.fn();

// Several pages pull in heavy ESM-only deps (react-leaflet, @mui/x-charts) or
// hit the network on mount. Replace them with placeholders for the App-level
// shell test — their internals are exercised in their own suites.
jest.mock("./components/public/affected-areas", () => () => null);
jest.mock("./components/public/statistics", () => () => null);
jest.mock("./components/public/rankings", () => () => null);
jest.mock("./components/public/data-search", () => () => null);
jest.mock("./components/public/methodology", () => () => null);
jest.mock("./components/public/file-report", () => () => null);
jest.mock("./components/public/home", () => () => (
    <div data-testid="home-page">home</div>
));

const App = require("./App").default;

describe("App shell", () => {
    test("renders the header brand and footer landmark", () => {
        render(<App />);
        expect(screen.getByText("Surface to Air Reports")).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    test("renders the home page at the / route", () => {
        render(<App />);
        expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
});
