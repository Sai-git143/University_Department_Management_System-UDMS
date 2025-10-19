import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaChartPie } from 'react-icons/fa';

const OverallAttendance = ({ attendance }) => {
  if (!attendance) {
    return null;
  }

  const overallAttendance = attendance['Consolidated Percentage'];
  const variant = overallAttendance >= 75 ? 'success' : overallAttendance >= 60 ? 'warning' : 'danger';

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaChartPie className="me-2" />
        Overall Attendance
      </Card.Header>
      <Card.Body className="text-center">
        <h2>{overallAttendance.toFixed(2)}%</h2>
        <ProgressBar now={overallAttendance} variant={variant} label={`${overallAttendance.toFixed(2)}%`} className="mt-3" />
        <Card.Text className="mt-2 text-muted">
          {overallAttendance >= 75 ? 'You are in good standing.' : 'Your attendance is below the required threshold.'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OverallAttendance;
