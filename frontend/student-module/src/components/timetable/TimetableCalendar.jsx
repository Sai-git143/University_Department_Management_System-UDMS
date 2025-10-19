import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { timetableData } from '../../mockData';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TimetableCalendar = ({ selectedSemester }) => {
  const events = [];
  const currentTimetable = timetableData[selectedSemester];

  if (currentTimetable) {
    Object.keys(currentTimetable).forEach(day => {
      currentTimetable[day].forEach(cls => {
        const [startHour, startMinute] = cls.time.split('-')[0].split(':').map(Number);
        const [endHour, endMinute] = cls.time.split('-')[1].split(':').map(Number);

        // For demonstration, let's assume all classes are in the current week
        // In a real app, you'd calculate actual dates
        const today = moment();
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
        const classDate = today.day(dayIndex);

        events.push({
          title: `${cls.subject} (${cls.type}) - ${cls.room}`,
          start: classDate.clone().hour(startHour).minute(startMinute).toDate(),
          end: classDate.clone().hour(endHour).minute(endMinute).toDate(),
          allDay: false,
          resource: cls,
        });
      });
    });
  }

  const eventPropGetter = (event) => {
    const backgroundColor = event.resource.color || '#3174ad';
    return { style: { backgroundColor } };
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FaCalendarAlt className="me-2" />
        Timetable Calendar (Semester {selectedSemester})
      </Card.Header>
      <Card.Body style={{ height: '700px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView="week"
          views={['week', 'day']}
          eventPropGetter={eventPropGetter}
        />
      </Card.Body>
    </Card>
  );
};

export default TimetableCalendar;
