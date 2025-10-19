import React, { useEffect, useState } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { timetableData } from '../../mockData';
import { FaClock } from 'react-icons/fa';

const TimetableGrid = ({ selectedSemester }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getCurrentDay = () => {
    const day = currentTime.getDay();
    return days[day === 0 ? 6 : day - 1]; // Adjust for Sunday (0)
  };

  const isCurrentClass = (day, timeSlot) => {
    const currentDay = getCurrentDay();
    if (day !== currentDay) return false;

    const [startHour, startMinute] = timeSlot.split('-')[0].split(':').map(Number);
    const [endHour, endMinute] = timeSlot.split('-')[1].split(':').map(Number);

    const classStartTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), startHour, startMinute);
    const classEndTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), endHour, endMinute);

    return currentTime >= classStartTime && currentTime < classEndTime;
  };

  const getCellContent = (day, timeSlot) => {
    const daySchedule = timetableData[selectedSemester]?.[day] || [];
    const classInfo = daySchedule.find(
      (cls) => cls.time === timeSlot
    );

    if (classInfo) {
      return (
        <div style={{ backgroundColor: classInfo.color, padding: '5px', borderRadius: '5px', color: 'black' }}>
          <strong>{classInfo.subject}</strong>
          <br />
          <small>{classInfo.faculty}</small>
          <br />
          <small>{classInfo.room} ({classInfo.type})</small>
        </div>
      );
    }
    return <Badge bg="light" text="dark">Free</Badge>;
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaClock className="me-2" />
        Weekly Timetable (Semester {selectedSemester})
      </Card.Header>
      <Card.Body>
        <Table bordered responsive className="timetable-grid">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td>{timeSlot}</td>
                {days.map(day => (
                  <td
                    key={`${day}-${timeSlot}`}
                    className={isCurrentClass(day, timeSlot) ? 'table-primary' : ''}
                  >
                    {getCellContent(day, timeSlot)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TimetableGrid;
