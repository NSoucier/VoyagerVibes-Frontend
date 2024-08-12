// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jest.setup.js
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.warn = (...args) => {
    if (args[0] && args[0].includes('specific warning message')) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});