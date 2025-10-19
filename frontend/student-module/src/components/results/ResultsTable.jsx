import React from 'react';
import { Table, Card } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';

const ResultsTable = ({ results, loading }) => {
  if (loading) {
    return <p>Loading results...</p>;
  }

  if (!results || results.length === 0) {
    return <p>No results found for this semester.</p>;
  }

  return (
    <Card>
      <Card.Header>
        <FaBook className="me-2" />
        Semester Results
      </Card.Header>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.subject}</td>
              <td>{result.credits}</td>
              <td>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ResultsTable;
