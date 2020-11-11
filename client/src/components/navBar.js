import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav } from "react-bootstrap"

const CustomNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" id="site-navbar">
      <Link to="/" className="link-no-style">
        <Navbar.Brand as="span">PhotoShare</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/page-2" className="link-no-style">
            <Nav.Link as="span" eventKey="page-2">
              Page 2
            </Nav.Link>
          </Link>
        </Nav>
        <Nav className="ml-auto">
          <Link to="/account" className="link-no-style">
            <Nav.Link as="span" eventKey="account">
              Account
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
