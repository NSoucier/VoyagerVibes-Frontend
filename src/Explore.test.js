import React, { act } from "react";
import { render, fireEvent } from "@testing-library/react";
import Explore from "./Explore";
import { Route, Routes, MemoryRouter ,BrowserRouter } from "react-router-dom";
// import ReactDOM from 'react-dom/client';

// set user to be 'testUser'
localStorage.user = 'testUser';

// smoke test
it("renders without crashing", async function () {
    // await act(() => {
        render(
              <BrowserRouter>
                <Explore />
              </BrowserRouter>
          );
    // });
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

// it("displays a generate button", function() {
//     localStorage.user = 'testUser';
//     const {container} = render(
//         <BrowserRouter>
//             <Explore />
//         </BrowserRouter>
//       );

//     expect(container.querySelector('#home-login')).toBeInTheDocument();
// });

// it("displays form to generate itinerary", () => {
//     const { container } = render(
//         <BrowserRouter>
//           <Explore />
//         </BrowserRouter>
//     );

//     // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', container)
//     expect(
//         container.querySelector('#save')
//     ).toBeInTheDocument();
// });

localStorage.removeItem('user');
