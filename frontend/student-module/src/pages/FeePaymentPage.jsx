import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../api';

const FeePaymentPage = () => {
  const [feeData, setFeeData] = useState({ feeStructure: null, paymentHistory: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/student/fees');
        setFeeData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load fee details. Please try again later.');
      }
      setLoading(false);
    };

    fetchFeeData();
  }, []);

  const handlePayment = async () => {
    const amountToPay = feeData.feeStructure?.pending_amount;
    if (!amountToPay || amountToPay <= 0) {
      alert('No pending fees to pay.');
      return;
    }

    try {
      // Step 1: Initiate payment and get order details from backend
      const order = await api.post('/student/fees/initiate-payment', { amount: amountToPay });
      console.log('Order created:', order.data);
      alert(`Payment initiated! In a real app, the Razorpay checkout would open now with order ID: ${order.data.id}`);

      // Step 2: Open Razorpay checkout (Full implementation would go here)
      // This would involve loading the Razorpay script and using the order details.

    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('Could not initiate payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const { feeStructure, paymentHistory } = feeData;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header><h4>Payment History</h4></Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Date</th>
                    <th>Amount Paid</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.length > 0 ? (
                    paymentHistory.map(p => (
                      <tr key={p._id}>
                        <td>{p.receipt_number}</td>
                        <td>{new Date(p.payment_date).toLocaleDateString()}</td>
                        <td>${p.amount.toFixed(2)}</td>
                        <td>{p.transaction_id}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No payment history found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header><h4>Fee Details</h4></Card.Header>
            {feeStructure ? (
              <Card.Body>
                <p><strong>Tuition Fees:</strong> ${feeStructure.tuition_fee.toFixed(2)}</p>
                <p><strong>Lab Fees:</strong> ${feeStructure.lab_fee.toFixed(2)}</p>
                <p><strong>Library Fees:</strong> ${feeStructure.library_fee.toFixed(2)}</p>
                <hr />
                <p><strong>Total Amount:</strong> ${feeStructure.total_amount.toFixed(2)}</p>
                <p><strong>Amount Paid:</strong> ${feeStructure.paid_amount.toFixed(2)}</p>
                <h5 className="text-danger"><strong>Pending Amount:</strong> ${feeStructure.pending_amount.toFixed(2)}</h5>
                <div className="d-grid mt-4">
                  <Button 
                    variant="success" 
                    onClick={handlePayment}
                    disabled={feeStructure.pending_amount <= 0}
                  >
                    Pay Now
                  </Button>
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                <p>No fee structure found for the current semester.</p>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeePaymentPage;