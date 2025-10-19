import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const PersonalInfo = ({ isEditMode, student, setStudent }) => {
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaUser className="me-2" />
        Personal Information
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name="email" value={student.email} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phone_number" value={student.phone_number} onChange={handleChange} readOnly={!isEditMode} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control type="text" name="father_name" value={student.father_name} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" name="gender" value={student.gender} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="date_of_birth" value={student.date_of_birth ? new Date(student.date_of_birth).toISOString().split('T')[0] : ''} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={student.category} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} name="address" value={student.address} onChange={handleChange} readOnly={!isEditMode} />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={student.city} onChange={handleChange} readOnly={!isEditMode} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={student.state} onChange={handleChange} readOnly={!isEditMode} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" name="pincode" value={student.pincode} onChange={handleChange} readOnly={!isEditMode} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PersonalInfo;
