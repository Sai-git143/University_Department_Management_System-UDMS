import React, { useState, useEffect } from 'react';
import { Container, Accordion, Card, Button, Spinner, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import api from '../api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get('/student/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load courses. Please try again later.');
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>My Courses</h2>
      <Accordion alwaysOpen>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <Accordion.Item eventKey={index.toString()} key={course._id}>
              <Accordion.Header>
                <div className="d-flex justify-content-between w-100 me-3">
                  <strong>{course.name} ({course.code})</strong>
                  <span>Faculty: {course.faculty?.full_name || 'N/A'}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p>{course.description}</p>
                <Row>
                  <Col md={6}>
                    <h5>Objectives</h5>
                    <ListGroup variant="flush">
                      {course.objectives?.map((obj, i) => <ListGroup.Item key={i}>{obj}</ListGroup.Item>)}
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <h5>Outcomes</h5>
                    <ListGroup variant="flush">
                      {course.outcomes?.map((out, i) => <ListGroup.Item key={i}>{out}</ListGroup.Item>)}
                    </ListGroup>
                  </Col>
                </Row>
                <hr />
                <h5>Syllabus</h5>
                <p>{course.syllabus || 'Not available.'}</p>
                <hr />
                <h5>Reference Books</h5>
                <ListGroup variant="flush">
                  {course.reference_books?.map((book, i) => <ListGroup.Item key={i}>{book}</ListGroup.Item>)}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <Alert variant="info">You are not enrolled in any courses for the current semester.</Alert>
        )}
      </Accordion>
    </Container>
  );
};

export default CoursesPage;
