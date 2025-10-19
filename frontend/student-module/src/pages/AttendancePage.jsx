import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Button, Spinner, Alert } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import api from '../api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState({ subjectSummary: [], overallPercentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await api.get('/student/attendance');
        setAttendanceData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load attendance data. Please try again later.');
      }
      setLoading(false);
    };

    fetchAttendance();
  }, []);

  const getStatusVariant = (percentage) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    return 'danger';
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("Attendance Report", 20, 10);
    doc.autoTable({
      head: [['Subject', 'Attended', 'Total Classes', 'Percentage']],
      body: attendanceData.subjectSummary.map(s => [
        s.courseName,
        s.attendedClasses,
        s.totalClasses,
        `${s.percentage}%`,
      ]),
    });
    doc.save('attendance-report.pdf');
  };

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
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col><h2>Attendance</h2></Col>
            <Col md="auto">
              <Button variant="primary" onClick={downloadReport}>
                <FaDownload className="me-2" />
                Download Report
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <h4>Overall Attendance: {attendanceData.overallPercentage}%</h4>
          <ProgressBar 
            now={attendanceData.overallPercentage} 
            variant={getStatusVariant(attendanceData.overallPercentage)} 
            className="mb-4"
          />

          <h4>Subject-wise Attendance</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Attended</th>
                <th>Total Classes</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.subjectSummary.map(subject => (
                <tr key={subject.courseName}>
                  <td>{subject.courseName}</td>
                  <td>{subject.attendedClasses}</td>
                  <td>{subject.totalClasses}</td>
                  <td>
                    <ProgressBar 
                      now={subject.percentage} 
                      label={`${subject.percentage}%`} 
                      variant={getStatusVariant(subject.percentage)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AttendancePage;