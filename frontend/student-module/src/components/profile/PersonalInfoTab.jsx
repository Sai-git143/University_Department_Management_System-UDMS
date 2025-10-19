import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api';

const PersonalInfoTab = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.put('/profile', formData);
      setMessage('Profile updated successfully!');
      onUpdate(); // Refresh parent data
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Edit Personal & Contact Information</Card.Title>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
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

export default PersonalInfoTab;
