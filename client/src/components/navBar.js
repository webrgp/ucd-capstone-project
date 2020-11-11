import React from "react"
import { Link } from "gatsby"
import { login, logout, isAuthenticated } from "../utils/auth"
import { Navbar, Nav } from "react-bootstrap"

const CustomNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" id="site-navbar">
      <Link to="/" className="link-no-style">
        <Navbar.Brand as="span">PhotoShare</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        { isAuthenticated() && (
          <Nav className="mr-auto">
            <Link to="/me" className="link-no-style">
              <Nav.Link as="span" eventKey="me">
                Photos
              </Nav.Link>
            </Link>
            <Link to="/me/profile" className="link-no-style">
              <Nav.Link as="span" eventKey="profile">
                Profile
              </Nav.Link>
            </Link>
          </Nav>
        )}

        <Nav className="ml-auto">
          {
            isAuthenticated()
            ? <button
                className="btn btn-outline-primary"
                onClick={e => {
                  logout()
                  e.preventDefault()
                }}
              >
                Logout
              </button>
            : <button
                className="btn btn-outline-primary"
                onClick={e => {
                  login()
                  e.preventDefault()
                }}
              >
                Login
              </button>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
