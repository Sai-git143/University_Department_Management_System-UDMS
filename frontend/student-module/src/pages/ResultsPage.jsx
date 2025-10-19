import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import api from '../api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ResultsPage = () => {
  const [resultsData, setResultsData] = useState({ results: [], summary: {} });
  const [filters, setFilters] = useState({ semester: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await api.get('/student/results', { params: filters });
        setResultsData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load results. Please try again later.');
      }
      setLoading(false);
    };

    fetchResults();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getStatusStyle = (status) => {
    if (status === 'Pass') return { color: 'green', fontWeight: 'bold' };
    if (status === 'Fail') return { color: 'red', fontWeight: 'bold' };
    return {};
  };

  const downloadGradeSheet = () => {
    const doc = new jsPDF();
    doc.text("Grade Sheet", 20, 10);
    doc.autoTable({
      head: [['Course Code', 'Course Name', 'Credits', 'Grade', 'Status']],
      body: resultsData.results.map(r => [
        r.course?.code || 'N/A',
        r.course?.name || 'N/A',
        r.credits,
        r.grade,
        r.status,
      ]),
    });
    doc.save('grade-sheet.pdf');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col><h2>View Results</h2></Col>
            <Col md="auto">
              <Button variant="primary" onClick={downloadGradeSheet}>
                <FaDownload className="me-2" />
                Download Grade Sheet
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form className="mb-4">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filter by Semester</Form.Label>
                  <Form.Select name="semester" value={filters.semester} onChange={handleFilterChange}>
                    <option value="">All Semesters</option>
                    {[...Array(8).keys()].map(i => (
                      <option key={i+1} value={i+1}>Semester {i+1}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Internal Marks</th>
                    <th>External Marks</th>
                    <th>Total Marks</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.results.map(result => (
                    <tr key={result._id}>
                      <td>{result.course?.code || 'N/A'}</td>
                      <td>{result.course?.name || 'N/A'}</td>
                      <td>{result.credits}</td>
                      <td>{result.grade}</td>
                      <td>{result.internal_marks}</td>
                      <td>{result.external_marks}</td>
                      <td>{result.total_marks}</td>
                      <td style={getStatusStyle(result.status)}>{result.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <h4>Summary</h4>
              <Row>
                <Col md={6}>
                  <strong>Overall CGPA:</strong> {resultsData.summary.cgpa}
                </Col>
                {filters.semester && (
                  <Col md={6}>
                    <strong>Semester GPA (SGPA):</strong> {resultsData.summary.sgpa}
                  </Col>
                )}
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResultsPage;