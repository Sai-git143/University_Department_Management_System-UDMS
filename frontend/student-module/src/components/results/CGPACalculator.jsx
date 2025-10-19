import React from 'react';
import { Card } from 'react-bootstrap';

const CGPACalculator = ({ results }) => {
  const calculateCGPA = () => {
    if (!results || results.length === 0) {
      return 'N/A';
    }
    const total = results.reduce((acc, result) => acc + result.grade, 0);
    return (total / results.length).toFixed(2);
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Overall CGPA</Card.Title>
        <h2>{calculateCGPA()}</h2>
      </Card.Body>
    </Card>
  );
};

export default CGPACalculator;
