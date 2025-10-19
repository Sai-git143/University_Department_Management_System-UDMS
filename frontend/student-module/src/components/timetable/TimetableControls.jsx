import React from 'react';
import { Form, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { FaTable, FaCalendarAlt, FaFilePdf, FaFileExcel, FaGoogle, FaPrint, FaRss } from 'react-icons/fa';
import { timetableData } from '../../mockData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const TimetableControls = ({ selectedSemester, setSelectedSemester, view, setView }) => {
  const semesters = Object.keys(timetableData);

  const handlePdfExport = async () => {
    const input = document.getElementById('timetable-content'); // Assuming an ID on the timetable container
    if (!input) {
      alert('Timetable content not found for PDF export.');
      return;
    }
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`timetable_semester_${selectedSemester}.pdf`);
  };

  const handleExcelExport = () => {
    const currentTimetable = timetableData[selectedSemester];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
      '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
      '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
    ];

    const wsData = [['Time', ...days]];
    timeSlots.forEach(timeSlot => {
      const row = [timeSlot];
      days.forEach(day => {
        const classInfo = currentTimetable?.[day]?.find(cls => cls.time === timeSlot);
        row.push(classInfo ? `${classInfo.subject} (${classInfo.type}) - ${classInfo.room}` : 'Free');
      });
      wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Semester ${selectedSemester}`);
    XLSX.writeFile(wb, `timetable_semester_${selectedSemester}.xlsx`);
  };

  const handleGoogleCalendarExport = () => {
    alert('Export to Google Calendar functionality would be implemented here.');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubscribe = () => {
    alert('Subscribe to calendar updates functionality would be implemented here.');
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <Form.Group controlId="semesterFilter">
        <Form.Label className="me-2">Semester:</Form.Label>
        <Form.Select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} style={{ width: '150px', display: 'inline-block' }}>
          {semesters.map(semester => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <ButtonGroup>
        <Button variant={view === 'grid' ? 'primary' : 'outline-primary'} onClick={() => setView('grid')}>
          <FaTable className="me-2" />Grid View
        </Button>
        <Button variant={view === 'calendar' ? 'primary' : 'outline-primary'} onClick={() => setView('calendar')}>
          <FaCalendarAlt className="me-2" />Calendar View
        </Button>
      </ButtonGroup>

      <Dropdown as={ButtonGroup}>
        <Button variant="success">Export Options</Button>
        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handlePdfExport}><FaFilePdf className="me-2" />Download PDF</Dropdown.Item>
          <Dropdown.Item onClick={handleExcelExport}><FaFileExcel className="me-2" />Download Excel</Dropdown.Item>
          <Dropdown.Item onClick={handleGoogleCalendarExport}><FaGoogle className="me-2" />Export to Google Calendar</Dropdown.Item>
          <Dropdown.Item onClick={handlePrint}><FaPrint className="me-2" />Print Timetable</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSubscribe}><FaRss className="me-2" />Subscribe to Updates</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TimetableControls;
