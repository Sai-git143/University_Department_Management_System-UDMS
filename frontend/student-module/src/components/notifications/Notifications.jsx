import React, { useState } from 'react';
import { notifications as mockNotifications } from '../../mockData';
import { ListGroup, Badge, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaBell, FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState({ category: 'All', status: 'All' });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter.category !== 'All' && n.category !== filter.category) {
      return false;
    }
    if (filter.status !== 'All') {
      if (filter.status === 'Read' && !n.read) return false;
      if (filter.status === 'Unread' && n.read) return false;
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <Card.Header>
        <FaBell className="me-2" />
        Notifications
        <Badge bg="primary" className="ms-2">{unreadCount} Unread</Badge>
      </Card.Header>
      <Card.Body>
        <Form className="mb-3">
          <Row>
            <Col md={4}>
              <Form.Group controlId="filterCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
                  <option>All</option>
                  <option>Academic</option>
                  <option>Fees</option>
                  <option>Events</option>
                  <option>General</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                  <option>All</option>
                  <option>Read</option>
                  <option>Unread</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <ListGroup>
          {filteredNotifications.map(notification => (
            <ListGroup.Item key={notification.id} as="li" className={`d-flex justify-content-between align-items-start ${notification.read ? '' : 'fw-bold'}`}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{notification.title}</div>
                {notification.description}
                <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
                  <span>{notification.date}</span> | <span>{notification.category}</span>
                </div>
              </div>
              <div>
                {!notification.read && (
                  <Button variant="outline-success" size="sm" onClick={() => handleMarkAsRead(notification.id)} title="Mark as Read">
                    <FaEnvelopeOpen />
                  </Button>
                )}
                <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDelete(notification.id)} title="Delete">
                  <FaTrash />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Notifications;