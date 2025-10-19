import React from 'react';
import { Card, ListGroup, ProgressBar, Badge } from 'react-bootstrap';
import { FaBookReader } from 'react-icons/fa';

const SubjectAttendance = ({ attendance }) => {
  if (!attendance) {
    return null;
  }

  const getStatus = (percentage) => {
    if (percentage >= 75) return { variant: 'success', label: 'Safe' };
    if (percentage >= 60) return { variant: 'warning', label: 'Risk' };
    return { variant: 'danger', label: 'Critical' };
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaBookReader className="me-2" />
        Subject-wise Attendance
      </Card.Header>
      <ListGroup variant="flush">
        {Object.entries(attendance.Subjects).map(([subjectName, subjectData]) => {
          const status = getStatus(subjectData.Percentage);
          return (
            <ListGroup.Item key={subjectName}>
              <div className="d-flex justify-content-between align-items-center">
                <h5>{subjectName}</h5>
                <Badge bg={status.variant}>{status.label}</Badge>
              </div>
              <p className="text-muted mb-1">
                Attended: {subjectData['Classes Attended']} / {subjectData['Classes Taken']} classes
              </p>
              <ProgressBar now={subjectData.Percentage} variant={status.variant} label={`${subjectData.Percentage.toFixed(2)}%`} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default SubjectAttendance;
