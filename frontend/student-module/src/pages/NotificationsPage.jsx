import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Spinner, Alert, Row, Col, Form, Badge } from 'react-bootstrap';
import { FaBell, FaCheckCircle, FaEnvelopeOpen } from 'react-icons/fa';
import api from '../api';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({ read_status: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/student/notifications', { params: filters });
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load notifications.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/student/notifications/${id}/read`);
      fetchNotifications(); // Refetch to update the list
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleMarkAsUnread = async (id) => {
    try {
      await api.put(`/student/notifications/${id}/unread`);
      fetchNotifications(); // Refetch to update the list
    } catch (err) {
      console.error('Failed to mark as unread', err);
    }
  };

  const getCategoryVariant = (category) => {
    switch (category) {
      case 'Fees': return 'danger';
      case 'Academic': return 'info';
      case 'Events': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header><h2><FaBell className="me-2" />Notifications</h2></Card.Header>
        <Card.Body>
          <Form className="mb-4">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filter by Status</Form.Label>
                  <Form.Select name="read_status" value={filters.read_status} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filter by Category</Form.Label>
                  <Form.Select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Fees">Fees</option>
                    <option value="Events">Events</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <ListGroup variant="flush">
              {notifications.length > 0 ? (
                notifications.map(n => (
                  <ListGroup.Item key={n._id} className={`d-flex justify-content-between align-items-start ${!n.is_read ? 'fw-bold' : ''}`}>
                    <div>
                      <h5>{n.title} <Badge bg={getCategoryVariant(n.category)}>{n.category}</Badge></h5>
                      <p>{n.message}</p>
                      <small className="text-muted">{new Date(n.created_at).toLocaleString()}</small>
                    </div>
                    <div>
                      {n.is_read ? (
                        <Button variant="outline-secondary" size="sm" onClick={() => handleMarkAsUnread(n._id)}>
                          <FaEnvelopeOpen className="me-1" /> Mark as Unread
                        </Button>
                      ) : (
                        <Button variant="outline-success" size="sm" onClick={() => handleMarkAsRead(n._id)}>
                          <FaCheckCircle className="me-1" /> Mark as Read
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <div className="text-center p-4">No notifications found.</div>
              )}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationsPage;