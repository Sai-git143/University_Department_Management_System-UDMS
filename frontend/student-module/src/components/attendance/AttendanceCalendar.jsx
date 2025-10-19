import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { dailyAttendance } from '../../mockData';
import { FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';

const AttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = moment(date).format('YYYY-MM-DD');
      const attendanceRecord = dailyAttendance.find(record => record.date === dateString);

      if (attendanceRecord) {
        const percentage = attendanceRecord.dailyPercentage;
        if (percentage === 100) {
          return 'attendance-full'; // Darkest green
        } else if (percentage >= 75) {
          return 'attendance-high'; // Medium green
        } else if (percentage >= 50) {
          return 'attendance-medium'; // Light green
        } else if (percentage > 0) {
          return 'attendance-low'; // Yellowish
        } else {
          return 'attendance-absent'; // Red
        }
      }
    }
    return null;
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaCalendarAlt className="me-2" />
        Monthly Attendance
      </Card.Header>
      <Card.Body>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={getTileClassName}
          className="w-100"
        />
      </Card.Body>
    </Card>
  );
};

export default AttendanceCalendar;
