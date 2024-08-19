import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    );
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});

it("displays a sign up form", function() {
    const {container} = render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
      );

    expect(container.querySelector('#loginForm')).toBeInTheDocument();
});