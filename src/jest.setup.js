// jest.setup.js
const originalConsoleWarn = console.warn;

console.warn = (...args) => {
  if (args[0] && args[0].includes('ReactDOMTestUtils.act is deprecated')) {
    // Ignore this specific warning
    return;
  }
  originalConsoleWarn(...args);
};

// Optionally, you can restore the original console.warn after each test
afterEach(() => {
  console.warn = originalConsoleWarn;
});