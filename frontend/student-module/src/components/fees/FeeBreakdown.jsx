import React from 'react';
import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { feeDetails } from '../../mockData';
import { FaMoneyBillWave } from 'react-icons/fa';

const FeeBreakdown = ({ onPayNow }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <FaMoneyBillWave className="me-2" />
        Current Due Fees
      </Card.Header>
      <ListGroup variant="flush">
        {feeDetails.breakdown.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {item.item}
            <span>₹{item.amount.toLocaleString()}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold">
          Total Amount
          <span>₹{feeDetails.totalAmount.toLocaleString()}</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="text-center">
        <div className="d-flex justify-content-around align-items-center">
          <div>
            <Card.Text className="text-muted mb-0">Due Date</Card.Text>
            <Card.Text>{feeDetails.dueDate}</Card.Text>
          </div>
          <div>
            <Card.Text className="text-muted mb-0">Status</Card.Text>
            <Badge bg={feeDetails.status === 'Due' ? 'warning' : 'success'}>
              {feeDetails.status}
            </Badge>
          </div>
        </div>
        <Button variant="primary" className="mt-3" onClick={onPayNow}>
          Pay Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FeeBreakdown;
