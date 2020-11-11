/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import { Container, Row, Col } from "react-bootstrap"

import Navbar from "./navBar"

const Layout = ({ children, pageInfo }) => (
  <>
    <Container fluid className="px-0 main">
      <Navbar pageInfo={pageInfo} />
      <Row noGutters>
        <Col>
          <Container className="mt-5">
            <main>{children}</main>
          </Container>
        </Col>
      </Row>
    </Container>
    <Container fluid className="px-0">
      <Row noGutters>
        <Col className="footer-col">
          <footer>
            <span>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </span>
          </footer>
        </Col>
      </Row>
    </Container>
  </>
)

export default Layout
