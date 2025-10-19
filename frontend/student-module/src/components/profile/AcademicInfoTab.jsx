import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const AcademicInfoTab = ({ profile }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Academic Information</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Registration ID:</strong> {profile.registration_id}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Department:</strong> {profile.department?.name || 'N/A'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Course:</strong> {profile.course.map(c => c.name).join(', ') || 'N/A'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Year:</strong> {profile.year}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Semester:</strong> {profile.semester}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registration Status:</strong> {profile.registration_status}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AcademicInfoTab;
