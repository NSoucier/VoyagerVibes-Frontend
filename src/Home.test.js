import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
          );
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});

it("displays a login button", function() {
    const {container} = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
      );

    expect(container.querySelector('#home-login')).toBeInTheDocument();
});

it("displays a welcome message to user", function() {
    localStorage.user = 'testUser'
    const {container} = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
      );

    expect(container.querySelector('.message')).toBeInTheDocument();
    localStorage.removeItem('user');
});