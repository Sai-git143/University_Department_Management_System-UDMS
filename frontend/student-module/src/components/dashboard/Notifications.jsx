import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Alert } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import api from '../../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/student/dashboard');
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error(err);
        setError('Could not fetch notifications.');
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaBell className="me-2" />
        Recent Notifications
      </Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <ListGroup.Item>Loading...</ListGroup.Item>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : notifications.length > 0 ? (
          notifications.map(notification => (
            <ListGroup.Item key={notification._id}>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <small className="text-muted">{new Date(notification.created_at).toLocaleString()}</small>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No recent notifications.</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default Notifications;
