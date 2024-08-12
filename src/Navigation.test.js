import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    await act(() => {
        render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
          );
    });
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});


