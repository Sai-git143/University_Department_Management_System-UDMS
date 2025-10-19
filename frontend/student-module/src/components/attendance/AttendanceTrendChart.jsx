import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { attendance } from '../../mockData'; // Reusing the existing attendance data for trend
import { FaChartLine } from 'react-icons/fa';

const AttendanceTrendChart = () => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaChartLine className="me-2" />
        Attendance Trend
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="percentage" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default AttendanceTrendChart;
