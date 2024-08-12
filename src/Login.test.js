import React from "react";
import { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});

it("displays a login form", function() {
    const {container} = render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
      );

    expect(container.querySelector('#loginForm')).toBeInTheDocument();
});