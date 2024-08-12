import React from "react";
import { render } from "@testing-library/react";
import Error404 from "./Error404";

// smoke test
it("renders without crashing", function() {
  render(<Error404 />);
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Error404 />);
    expect(asFragment()).toMatchSnapshot();
});

// it("displays form to generate itinerary", () => {
//   const { container } = render(<Error404 />);

//   // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', container)
//   expect(
//       container.querySelector('button')
//   ).toBeInTheDocument();
// });