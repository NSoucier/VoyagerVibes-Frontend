import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Navigation.css';
  
  function Navigation({ logout }) {
    const [openNav, setOpenNav] = useState(false);
    const toggle = () => setOpenNav(!openNav);

    // logs out user
    function logoutUser() {
      logout();
    }
  
    return (
      <div>
        <Navbar expand="md" fixed="top" id="nav">
          <NavbarBrand><Link id="links" to='/'>VoyagerVibes</Link></NavbarBrand>
          <NavbarToggler onClick={toggle} id="toggler"/>
          <Collapse isOpen={openNav} navbar>
            { localStorage.user ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link id="links" to='/explore'>Explore</Link></NavLink>
                </NavItem>
              </Nav>              
              ) : ''
            }
            <Nav className="ms-auto" navbar>
              { localStorage.user ? 
                (
                  <>
                    <NavItem >
                      <NavLink><Link id="links" to='/profile'>{localStorage.user}</Link></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink><Link id="links" to='/' onClick={logoutUser}>Logout</Link></NavLink>
                    </NavItem>                
                  </>
                )
                : (
                  <>
                    <NavItem >
                      <NavLink><Link id="links" to='/login'>Login</Link></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink><Link id="links" to='/signup'>Sign Up</Link></NavLink>
                    </NavItem>                
                  </>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default Navigation;