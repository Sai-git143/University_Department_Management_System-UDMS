import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import WelcomeWidget from '../components/dashboard/WelcomeWidget';
import CourseProgress from '../components/dashboard/CourseProgress';
import GradesChart from '../components/dashboard/GradesChart';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import Notifications from '../components/dashboard/Notifications';
import QuickStats from '../components/dashboard/QuickStats';
import TodaysTimetable from '../components/dashboard/TodaysTimetable';
import QuickActions from '../components/dashboard/QuickActions';
import ProfileCompletion from '../components/dashboard/ProfileCompletion';
import RunningCourses from '../components/dashboard/RunningCourses';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import api from '../api';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/student/dashboard');
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data. Please try again later.');
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const exportToPdf = () => {
    const input = document.getElementById('dashboard-content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("dashboard.pdf");
      });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
    <Container fluid>
      <div id="dashboard-content">
        <Row>
          <Col>
            <WelcomeWidget message={dashboardData.welcomeMessage} />
          </Col>
        </Row>
        <Row>
          <Col>
            <QuickStats stats={dashboardData.quickStats} />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ProfileCompletion percentage={dashboardData.profileCompletion} />
          </Col>
          <Col md={8}>
            <QuickActions />
          </Col>
        </Row>
        <Row>
          <Col>
            <RunningCourses />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TodaysTimetable timetable={dashboardData.todaysTimetable} />
            <CourseProgress courses={dashboardData.courses} />
            <UpcomingDeadlines />
          </Col>
          <Col md={6}>
            <Notifications notifications={dashboardData.notifications} />
            <GradesChart cgpa={dashboardData.quickStats.cgpa} />
            <AttendanceChart percentage={dashboardData.quickStats.attendancePercentage} />
          </Col>
        </Row>
      </div>
      <Row>
        <Col className="text-center my-4">
          <Button variant="primary" onClick={exportToPdf}>Export to PDF</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
