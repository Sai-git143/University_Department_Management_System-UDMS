import React from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { paymentHistory } from '../../mockData';
import { FaHistory, FaDownload } from 'react-icons/fa';

const PaymentHistory = () => {
  return (
    <Card>
      <Card.Header>
        <FaHistory className="me-2" />
        Payment History
      </Card.Header>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Semester</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.transactionId}</td>
              <td>{payment.date}</td>
              <td>{payment.semester}</td>
              <td>₹{payment.amount.toLocaleString()}</td>
              <td>
                <Badge bg={payment.status === 'Paid' ? 'success' : 'danger'}>
                  {payment.status}
                </Badge>
              </td>
              <td className="text-center">
                <Button variant="outline-secondary" size="sm">
                  <FaDownload />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PaymentHistory;
