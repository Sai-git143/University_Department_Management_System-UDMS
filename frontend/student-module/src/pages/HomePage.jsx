import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <h1>Welcome to the University Department Management System</h1>
          <p>
            This is the student module. You can register as a new student using the button below.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">Register Now</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
