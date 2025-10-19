import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaRegChartBar } from 'react-icons/fa';

const AttendanceChart = ({ percentage }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaRegChartBar className="me-2" />
        Overall Attendance
      </Card.Header>
      <Card.Body>
        <ProgressBar now={percentage} label={`${percentage}%`} />
      </Card.Body>
    </Card>
  );
};

export default AttendanceChart;
