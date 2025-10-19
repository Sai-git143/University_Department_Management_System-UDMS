import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import api from '../api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TimetablePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const res = await api.get('/student/timetable');
        setTimetable(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load timetable. Please try again later.');
      }
      setLoading(false);
    };

    fetchTimetable();
  }, []);

  const getPeriod = (day, time) => {
    const period = timetable.find(p => p.day_of_week === day && p.start_time === time.split(' - ')[0]);
    if (!period) return null;
    return (
      <div>
        <strong>{period.subject_name}</strong><br />
        <small>{period.faculty?.full_name || 'N/A'}</small><br />
        <small>Room: {period.room_number}</small>
      </div>
    );
  };

  const downloadTimetable = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text("Weekly Timetable", 20, 10);
    doc.autoTable({
      head: [['Time Slot', ...days]],
      body: timeSlots.map(time => [
        time,
        ...days.map(day => {
          const period = timetable.find(p => p.day_of_week === day && p.start_time === time.split(' - ')[0]);
          return period ? `${period.subject_name}\n(${period.faculty?.full_name || 'N/A'})` : '-';
        })
      ]),
    });
    doc.save('timetable.pdf');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Weekly Timetable</h2>
            <Button variant="primary" onClick={downloadTimetable}>
              <FaDownload className="me-2" />
              Download as PDF
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map(day => <th key={day}>{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td>{time}</td>
                    {days.map(day => (
                      <td key={day}>{getPeriod(day, time)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TimetablePage;