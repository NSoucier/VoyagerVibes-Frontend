import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
    );
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

it("displays login/signup when logged out", function() {
    const {container} = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
      );
      expect(container.querySelectorAll('#links')[1]).toHaveTextContent('Login');
      expect(container.querySelectorAll('#links')[2]).toHaveTextContent('Sign Up');
});

it("displays profile/logout when user is logged in", function() {
    localStorage.user = 'testUser'
    const {container} = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
      );
    expect(container.querySelectorAll('#links')[2]).toHaveTextContent('testUser');
    expect(container.querySelectorAll('#links')[3]).toHaveTextContent('Logout');
    localStorage.removeItem('user');
});

it("show explore link when user is logged in", function() {
    localStorage.user = 'testUser'
    const {container} = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
      );
    expect(container.querySelectorAll('#links')[1]).toHaveTextContent('Explore');
    localStorage.removeItem('user');
});

it("don't show explore link when no one is logged in", function() {
    const {container} = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
      );
    expect(container.querySelectorAll('#links')[1]).not.toHaveTextContent('Explore');
});