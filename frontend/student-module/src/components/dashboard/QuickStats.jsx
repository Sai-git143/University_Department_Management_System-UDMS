import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaUserGraduate, FaRegCalendarCheck, FaFileInvoiceDollar, FaBookOpen } from 'react-icons/fa';
import api from '../../api';

const QuickStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/student/dashboard');
        setStats(res.data.quickStats);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Loading stats...</p>;
  }

  if (!stats) {
    return <p>Could not load stats.</p>;
  }

  return (
    <Row>
      <Col md={3}>
        <Card className="text-center mb-3">
          <Card.Body>
            <FaUserGraduate size={30} className="mb-2" />
            <Card.Title>{stats.cgpa.toFixed(2)} CGPA</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center mb-3">
          <Card.Body>
            <FaRegCalendarCheck size={30} className="mb-2" />
            <Card.Title>{stats.attendancePercentage}% Attendance</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center mb-3">
          <Card.Body>
            <FaFileInvoiceDollar size={30} className="mb-2" />
            <Card.Title>${stats.pendingFees} Fees Due</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center mb-3">
          <Card.Body>
            <FaBookOpen size={30} className="mb-2" />
            <Card.Title>{stats.upcomingExamsCount} Exams</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default QuickStats;