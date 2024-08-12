import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    await act(() => {
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
          );
    });
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});