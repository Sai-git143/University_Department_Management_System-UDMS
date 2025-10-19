import React from 'react';
import { Form, Button, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import { FaFilePdf, FaFilter } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AttendanceControls = ({ selectedSubject, setSelectedSubject, onExportPdf }) => {
  const subjects = ['All', 'Programming', 'Data Structures', 'DBMS', 'Operating Systems', 'Web Technologies']; // Mock subjects

  return (
    <Row className="mb-4 align-items-center">
      <Col md={4}>
        <Form.Group controlId="subjectFilter">
          <Form.Label className="me-2">Filter by Subject:</Form.Label>
          <Form.Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ display: 'inline-block', width: 'auto' }}
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={8} className="text-end">
        <Button variant="primary" onClick={onExportPdf}>
          <FaFilePdf className="me-2" />Export as PDF
        </Button>
      </Col>
    </Row>
  );
};

export default AttendanceControls;
