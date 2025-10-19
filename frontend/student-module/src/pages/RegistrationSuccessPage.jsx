import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const registrationId = location.state?.registrationId;

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">Registration Successful!</Card.Title>
              <Card.Text>
                Thank you for registering. Your application will be reviewed shortly.
              </Card.Text>
              {registrationId && (
                <Card.Text>
                  <strong>Your Registration ID is:</strong> {registrationId}
                </Card.Text>
              )}
              <Link to="/">
                <Button variant="primary">Back to Home</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationSuccessPage;
