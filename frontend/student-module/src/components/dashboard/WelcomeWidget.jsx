import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

const WelcomeWidget = ({ message, student }) => {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            {/* Placeholder for student image */}
            <Image src={`https://via.placeholder.com/80`} roundedCircle />
          </Col>
          <Col>
            <h2>{getGreeting()}, {message}!</h2>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WelcomeWidget;
