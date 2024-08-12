import React from "react";
import { render } from "@testing-library/react";
import TripHistory from "./TripHistory";

// smoke test
it("renders without crashing", function() {
  render(<TripHistory />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<TripHistory />);
  expect(asFragment()).toMatchSnapshot();
});