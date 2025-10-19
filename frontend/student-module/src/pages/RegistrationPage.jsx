import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { Container, Row, Col } from 'react-bootstrap';

const RegistrationPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <RegistrationForm />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
