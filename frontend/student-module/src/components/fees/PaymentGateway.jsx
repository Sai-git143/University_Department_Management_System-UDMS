import React, { useState } from 'react';
import { Modal, Button, Form, Nav, Row, Col } from 'react-bootstrap';
import { FaCreditCard, FaUniversity, FaMobileAlt } from 'react-icons/fa';

const PaymentGateway = ({ show, onHide, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="password" placeholder="CVV" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case 'netbanking':
        return (
          <Form.Group>
            <Form.Label>Select Bank</Form.Label>
            <Form.Select>
              <option>Select Bank</option>
              <option>Bank of Example</option>
              <option>State Bank of Test</option>
              <option>Test National Bank</option>
            </Form.Select>
          </Form.Group>
        );
      case 'upi':
        return (
          <Form.Group>
            <Form.Label>UPI ID</Form.Label>
            <Form.Control type="text" placeholder="yourname@upi" />
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="pills" activeKey={paymentMethod} onSelect={(k) => setPaymentMethod(k)} className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="card"><FaCreditCard className="me-2" />Card</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="netbanking"><FaUniversity className="me-2" />Net Banking</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="upi"><FaMobileAlt className="me-2" />UPI</Nav.Link>
          </Nav.Item>
        </Nav>
        {renderPaymentForm()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary">
          Pay ₹{amount.toLocaleString()}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentGateway;
