import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { Route, Routes, MemoryRouter, BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", async function () {
    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );
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

it("displays invalid if not logged in", function() {
    const {container} = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
      );
    expect(container.querySelector('p')).toHaveTextContent('Invalid request.');
});

it("displays edit profile form for user", function() {
    localStorage.user = 'testUser';
    const {container} = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
      );
    expect(container.querySelector('#editProfile')).toBeInTheDocument();
    localStorage.removeItem('user');
});

it("displays my trips section for user", function() {
    localStorage.user = 'testUser';
    const {container} = render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
      );
    expect(container.querySelector('h4')).toHaveTextContent('My trips:');
    localStorage.removeItem('user');
});