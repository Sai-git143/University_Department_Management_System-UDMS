import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api';

const EmergencyContactTab = ({ contact, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        relationship: contact.relationship || '',
        phone: contact.phone || '',
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.put('/profile', { emergency_contact: formData });
      setMessage('Emergency contact updated successfully!');
      onUpdate(); // Refresh parent data
    } catch (err) {
      console.error(err);
      setError('Failed to update emergency contact. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Edit Emergency Contact</Card.Title>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Relationship</Form.Label>
                <Form.Control 
                  type="text" 
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary">Save Changes</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EmergencyContactTab;
