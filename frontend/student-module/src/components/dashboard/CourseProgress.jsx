import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';

const CourseProgress = ({ courses = [] }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaBook className="me-2" />
        My Courses
      </Card.Header>
      <ListGroup variant="flush">
        {courses && courses.length > 0 ? (
          courses.map(course => (
            <ListGroup.Item key={course._id}>
              <div className="d-flex justify-content-between">
                <span>{course.name}</span>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No courses to display.</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default CourseProgress;
