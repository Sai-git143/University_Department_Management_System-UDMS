import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
