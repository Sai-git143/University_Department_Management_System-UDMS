import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa';

const EnrolledCourses = ({ student }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaBookOpen className="me-2" />
        Enrolled Courses
      </Card.Header>
      <ListGroup variant="flush">
        {student.course.map(course => (
          <ListGroup.Item key={course._id}>
            <div className="d-flex justify-content-between">
              <span>{course.name}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default EnrolledCourses;
