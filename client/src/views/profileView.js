import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

const ProfileView = ({user}) => {
  console.log(user);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Profile</h1>
          <hr />
          <dl>
            <dt>Name</dt>
            <dd>{user.name}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Token</dt>
            <dd>{user.token}</dd>
          </dl>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileView
