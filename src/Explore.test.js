import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Explore from "./Explore";
import { Route, Routes, MemoryRouter ,BrowserRouter } from "react-router-dom";
// import ReactDOM from 'react-dom/client';

// smoke test
it("renders without crashing", async function () {
    render(
            <BrowserRouter>
            <Explore />
            </BrowserRouter>
        );
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(
        <BrowserRouter>
            <Explore />
        </BrowserRouter>
      );
    expect(asFragment()).toMatchSnapshot();
});

it("displays an itinerary form", function() {
    // set user to be 'testUser'
    localStorage.user = 'testUser';
    const {container} = render(
        <BrowserRouter>
            <Explore />
        </BrowserRouter>
      );

    expect(container.querySelector('#title')).toBeInTheDocument();
    localStorage.removeItem('user');
});

it("displays button to save itinerary", function() {
    // set user to be 'testUser'
    localStorage.user = 'testUser';
    const {container} = render(
        <BrowserRouter>
            <Explore />
        </BrowserRouter>
      );

    expect(container.querySelector('#save')).toBeInTheDocument();
    localStorage.removeItem('user');
});