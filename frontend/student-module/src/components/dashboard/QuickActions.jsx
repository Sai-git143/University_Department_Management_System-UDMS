import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaRegChartBar, FaFileInvoiceDollar, FaCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <Card className="mb-4">
      <Card.Header>Quick Actions</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Link to="/results">
              <Button variant="outline-primary" className="w-100 mb-2">
                <FaRegChartBar className="me-2" />
                View Results
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/fees">
              <Button variant="outline-success" className="w-100 mb-2">
                <FaFileInvoiceDollar className="me-2" />
                Pay Fees
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/timetable">
              <Button variant="outline-info" className="w-100 mb-2">
                <FaCalendarAlt className="me-2" />
                Download Timetable
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/attendance">
              <Button variant="outline-warning" className="w-100 mb-2">
                <FaRegCalendarCheck className="me-2" />
                View Attendance
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default QuickActions;