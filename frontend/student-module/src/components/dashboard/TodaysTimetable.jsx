import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Alert } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import api from '../../api';

const TodaysTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/student/dashboard');
        setTimetable(res.data.todaysTimetable);
      } catch (err) {
        console.error(err);
        setError('Could not fetch timetable.');
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaClock className="me-2" />
        Today's Timetable
      </Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading timetable...</ListGroup.Item>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : timetable.length > 0 ? (
          timetable.map((item) => (
            <ListGroup.Item key={item._id}>
              <div className="d-flex justify-content-between">
                <span>{item.start_time} - {item.end_time}</span>
                <strong>{item.subject_name}</strong>
                <span>{item.faculty_name || 'N/A'}</span> {/* Assuming faculty_name is populated */}
                <span>{item.room_number}</span>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No classes today!</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default TodaysTimetable;