import React from "react";
import { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// jest.setup.js
const originalConsoleWarn = console.warn;

beforeEach(() => {
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
  console.warn = (...args) => {
    if (args[0] && args[0].includes('ReactDOMTestUtils.act is deprecated')) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});

// smoke test
it("renders without crashing", async function () {
    act(() => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
          );
    });
});

// snapshot test
// it("matches snapshot", function() {
//     const {asFragment} = render(
//         <BrowserRouter>
//             <Login />
//         </BrowserRouter>
//       );
//     expect(asFragment()).toMatchSnapshot();
// });