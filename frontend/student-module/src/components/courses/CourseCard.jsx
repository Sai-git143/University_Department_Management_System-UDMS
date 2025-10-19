import React, { useState } from 'react';
import { Card, Button, Collapse, ListGroup, Badge } from 'react-bootstrap';
import { FaBook, FaBullseye, FaClipboardList, FaDownload, FaEnvelope } from 'react-icons/fa';

const CourseCard = ({ course, status }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">{course.code} - {course.name}</h5>
          <small className="text-muted">{course.courseType}</small>
        </div>
        {status}
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <p className="mb-1"><strong>Credits:</strong> {course.credits}</p>
            <p className="mb-0"><strong>Faculty:</strong> {course.faculty ? course.faculty.name : 'N/A'}</p>
          </div>
          <Button variant="primary" onClick={() => setOpen(!open)} aria-controls={`collapse-${course._id}`} aria-expanded={open}>
            View Details
          </Button>
        </div>
        <Collapse in={open}>
          <div id={`collapse-${course._id}`} className="mt-3">
            <hr />
            <h5><FaInfoCircle className="me-2" />Course Details</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong><FaBullseye className="me-2" />Objectives:</strong>
                <ul>
                  {course.courseObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong><FaClipboardList className="me-2" />Outcomes:</strong>
                <ul>
                  {course.courseOutcomes.map((out, i) => <li key={i}>{out}</li>)}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong><FaBook className="me-2" />Reference Books:</strong>
                <ul>
                  {course.referenceBooks.map((book, i) => <li key={i}>{book.title} by {book.author}</li>)}
                </ul>
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-3">
              <Button variant="outline-primary" href={course.syllabus} target="_blank" rel="noopener noreferrer" className="me-2">
                <FaDownload className="me-2" />Syllabus
              </Button>
              <Button variant="outline-secondary" href={`mailto:${course.faculty ? course.faculty.email : ''}`}>
                <FaEnvelope className="me-2" />Contact Faculty
              </Button>
            </div>
            <hr />
            <h5>Study Materials</h5>
            {/* Placeholder for study materials */}
            <p>No study materials available yet.</p>
            <hr />
            <h5>Assignment Submission</h5>
            {/* Placeholder for assignment submission */}
            <p>No assignments due.</p>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;