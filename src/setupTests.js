// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// jsdom (in the version shipped with react-scripts 5) doesn't define
// TextEncoder / TextDecoder on globalThis, but react-router v7 needs them
// at module-load time.
if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
    globalThis.TextDecoder = TextDecoder;
}

// jsdom doesn't implement matchMedia; MUI Joy's CssVarsProvider relies on it
// for color-scheme detection. Provide a no-op stub so component tests can
// render without crashing.
// Header / Footer call window.scrollTo on every route change; jsdom logs a
// noisy "Not implemented" warning unless we stub it.
if (typeof window !== 'undefined') {
    window.scrollTo = window.scrollTo || (() => {});
}

if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}
