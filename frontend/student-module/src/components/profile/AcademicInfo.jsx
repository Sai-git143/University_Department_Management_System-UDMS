import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { FaUniversity } from 'react-icons/fa';

const AcademicInfo = ({ isEditMode, student, setStudent, section }) => {
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaUniversity className="me-2" />
        Academic Information
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name="department" value={student.department.name} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course/Program</Form.Label>
                <Form.Control type="text" name="course" value={student.course.map(c => c.name).join(', ')} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control type="text" name="year" value={student.year} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control type="text" name="semester" value={student.semester} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            {section && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Section</Form.Label>
                  <Form.Control type="text" name="section" value={section} readOnly />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>PUC Group</Form.Label>
                <Form.Control type="text" name="puc_group" value={student.puc_group} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>PUC Final CGPA</Form.Label>
                <Form.Control type="text" name="puc_final_cgpa" value={student.puc_final_cgpa} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>PUC Rank</Form.Label>
                <Form.Control type="text" name="puc_rank" value={student.puc_rank} onChange={handleChange} readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AcademicInfo;
