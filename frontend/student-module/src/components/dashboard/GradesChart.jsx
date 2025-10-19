import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GradesChart = ({ cgpa }) => {
  const gpa = cgpa || 0;
  const data = [
    { name: 'CGPA', value: gpa },
    { name: 'Max CGPA', value: 10 - gpa },
  ];

  const colors = ['#0088FE', '#FF8042'];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Current CGPA: {gpa.toFixed(2)}</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default GradesChart;
