import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { upcomingDeadlines } from '../../mockData';
import { FaCalendarAlt } from 'react-icons/fa';

const UpcomingDeadlines = () => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaCalendarAlt className="me-2" />
        Upcoming Deadlines
      </Card.Header>
      <ListGroup variant="flush">
        {upcomingDeadlines.map(deadline => (
          <ListGroup.Item key={deadline.id}>
            <div className="d-flex justify-content-between">
              <span>{deadline.title}</span>
              <span className="text-muted">{deadline.dueDate}</span>
            </div>
            <small className="text-muted">{deadline.course}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default UpcomingDeadlines;
