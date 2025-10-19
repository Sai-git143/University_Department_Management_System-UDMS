import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const ProfileCompletion = ({ percentage }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Profile Completion</Card.Title>
        <ProgressBar now={percentage} label={`${percentage}%`} />
      </Card.Body>
    </Card>
  );
};

export default ProfileCompletion;