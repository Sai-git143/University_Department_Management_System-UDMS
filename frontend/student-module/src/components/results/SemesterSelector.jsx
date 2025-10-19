import React from 'react';
import { Form } from 'react-bootstrap';

const SemesterSelector = ({ selectedSemester, setSelectedSemester, semesters }) => {
  const semesterOptions = Array.from({ length: semesters }, (_, i) => i + 1);

  return (
    <Form.Group controlId="semesterSelect" className="mb-4">
      <Form.Label>Select Semester</Form.Label>
      <Form.Select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
        {semesterOptions.map(semester => (
          <option key={semester} value={semester}>
            Semester {semester}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SemesterSelector;
