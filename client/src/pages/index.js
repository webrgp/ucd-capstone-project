import React from "react"
import { Row, Col, Container, Jumbotron, Button } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container className="text-center">
      <Row>
        <Col>
        <Jumbotron>
          <h1>PhotoShare</h1>
          <p>
            Share your pictures with other users, that can see the images you post and like them.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
