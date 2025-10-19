import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';

const ProfileHeader = ({ isEditMode, setIsEditMode, student }) => {
  return (
    <Row className="align-items-center mb-4">
      <Col xs="auto">
        <Image src={`http://localhost:5000/${student.profile_photo}`} roundedCircle width={120} height={120} />
      </Col>
      <Col>
        <h2>{student.full_name}</h2>
        <p className="text-muted">Student ID: {student.registration_id}</p>
      </Col>
      <Col xs="auto">
        <Button variant="outline-primary" onClick={() => setIsEditMode(!isEditMode)}>
          <FaUserEdit className="me-2" />
          {isEditMode ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
