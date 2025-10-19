import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false); // Placeholder
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.loginId || !formData.password) {
      setError('Please enter both email/registration ID and password.');
      return;
    }
    if (!captchaVerified) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }
    try {
      const res = await api.post('/student/auth/login', { loginId: formData.loginId, password: formData.password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Placeholder function for a real CAPTCHA component
  const handleCaptchaVerify = () => {
    setCaptchaVerified(true);
    setError('');
  };

  return (
    <Card>
      <Card.Body>
        <div className="text-center mb-4">
          <Image src="https://via.placeholder.com/100x50?text=University+Logo" alt="University Logo" />
        </div>
        <Card.Title as="h2" className="text-center">Student Login</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicLoginId">
            <Form.Label>Email address or Registration ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or registration ID"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Remember me" 
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </Form.Group>

          {/* CAPTCHA Placeholder */}
          <Form.Group className="mb-3 text-center">
            <Button variant="outline-secondary" onClick={handleCaptchaVerify} disabled={captchaVerified}>
              {captchaVerified ? 'CAPTCHA Verified' : 'Verify I am not a robot'}
            </Button>
            {/* In a real app, you would replace this button with a component like React-ReCAPTCHA */}
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <Row className="mt-3">
          <Col className="text-start">
            <Link to="/forgot-password">Forgot Password?</Link>
          </Col>
          <Col className="text-end">
            <Link to="/register">Don't have an account? Register</Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;