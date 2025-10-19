import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ProgressBar, Row, Col, Card, Image } from 'react-bootstrap';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import api from '../api';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Academic Info
    department: '',
    course: '',
    year: '',
    semester: '',

    // Documents
    photo: null,
    doc_10th: null,
    doc_12th: null,
    doc_id: null,
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registrationError, setRegistrationError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsRes = await api.get('/courses/departments');
        setDepartments(departmentsRes.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    const loadDraft = () => {
      const draft = localStorage.getItem('registrationDraft');
      if (draft) {
        const draftData = JSON.parse(draft);
        setFormData(prevData => ({ ...prevData, ...draftData }));
        alert('A saved draft has been loaded.');
      }
    };

    fetchDepartments();
    loadDraft();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (formData.department) {
        try {
          const coursesRes = await api.get(`/courses/by-department/${formData.department}`);
          setCourses(coursesRes.data);
        } catch (err) {
          console.error('Error fetching courses:', err);
        }
      }
    };
    fetchCourses();
  }, [formData.department]);

  const validate = () => {
    let tempErrors = {};
    if (step === 1) {
      if (!formData.fullName) tempErrors.fullName = "Full Name is required";
      if (!formData.email) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
      if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required";
      else if (!/^\d{10}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = "Phone number must be 10 digits";
      if (!formData.dateOfBirth) tempErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.address) tempErrors.address = "Address is required";
      if (!formData.city) tempErrors.city = "City is required";
      if (!formData.state) tempErrors.state = "State is required";
      if (!formData.pincode) tempErrors.pincode = "Pincode is required";
    }
    if (step === 2) {
      if (!formData.department) tempErrors.department = "Department is required";
      if (!formData.course) tempErrors.course = "Course is required";
      if (!formData.year) tempErrors.year = "Year is required";
      if (!formData.semester) tempErrors.semester = "Semester is required";
    }
    if (step === 3) {
      if (!formData.password || formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters long";
      if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
      if (!formData.terms) tempErrors.terms = "You must agree to the terms and conditions";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const nextStep = () => {
    if (validate()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSaveAsDraft = () => {
    const draftData = { ...formData };
    // Don't save file objects in localStorage
    delete draftData.photo;
    delete draftData.doc_10th;
    delete draftData.doc_12th;
    delete draftData.doc_id;
    localStorage.setItem('registrationDraft', JSON.stringify(draftData));
    alert('Your registration has been saved as a draft.');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const postData = new FormData();
      
      // Append all text fields from formData
      for (const key in formData) {
        if (typeof formData[key] === 'string' || typeof formData[key] === 'boolean' || typeof formData[key] === 'number') {
          postData.append(key, formData[key]);
        }
      }

      // Append files
      if (formData.photo) postData.append('photo', formData.photo);
      if (formData.doc_10th) postData.append('doc_10th', formData.doc_10th);
      if (formData.doc_12th) postData.append('doc_12th', formData.doc_12th);
      if (formData.doc_id) postData.append('doc_id', formData.doc_id);

      try {
        const res = await api.post('/student/auth/register', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        localStorage.removeItem('registrationDraft'); // Clear draft on successful submission
        navigate('/registration-success', { state: { registrationId: res.data.registration_id } });
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.msg === 'Student already exists') {
          setRegistrationError('This email is already registered. Please use a different email.');
        } else {
          console.error(err);
          alert('Registration failed. Please try again.');
        }
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card.Body>
            <Card.Title as="h2">Personal Information</Card.Title>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" isInvalid={!!errors.fullName} value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
              <Form.Control type="email" isInvalid={!!errors.email || !!registrationError} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              {registrationError && <Form.Text className="text-danger">{registrationError}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
              <Form.Control type="tel" isInvalid={!!errors.phoneNumber} value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
              <Form.Control type="date" isInvalid={!!errors.dateOfBirth} value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
              <Form.Select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
              <Form.Control as="textarea" rows={3} isInvalid={!!errors.address} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" isInvalid={!!errors.city} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" isInvalid={!!errors.state} value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                  <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="pincode">
                  <Form.Label>Pincode <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" isInvalid={!!errors.pincode} value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                  <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="secondary" onClick={handleSaveAsDraft}>Save as Draft</Button>
            <Button variant="primary" className="ms-2" onClick={nextStep}>Next</Button>
          </Card.Body>
        );
      case 2:
        return (
          <Card.Body>
            <Card.Title as="h2">Academic Information</Card.Title>
            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department <span className="text-danger">*</span></Form.Label>
              <Form.Select isInvalid={!!errors.department} value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                <option value="">-- Select Department --</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="course">
              <Form.Label>Course/Program <span className="text-danger">*</span></Form.Label>
              <Form.Select isInvalid={!!errors.course} value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                <option value="">-- Select Course --</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Year <span className="text-danger">*</span></Form.Label>
                  <Form.Select isInvalid={!!errors.year} value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})}>
                    <option value="">-- Select Year --</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="semester">
                  <Form.Label>Semester <span className="text-danger">*</span></Form.Label>
                  <Form.Select isInvalid={!!errors.semester} value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                    <option value="">-- Select Semester --</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.semester}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button variant="secondary" className="ms-2" onClick={handleSaveAsDraft}>Save as Draft</Button>
            <Button variant="primary" className="ms-2" onClick={nextStep}>Next</Button>
          </Card.Body>
        );
      case 3:
        return (
          <Card.Body>
            <Card.Title as="h2">Upload Documents & Set Password</Card.Title>
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>Upload Photo (max 2MB, jpg/png)</Form.Label>
              <Form.Control type="file" accept="image/jpeg, image/png" onChange={handlePhotoChange} />
              {photoPreview && <Image src={photoPreview} thumbnail width={150} className="mt-2" />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="doc_10th">
              <Form.Label>10th Marksheet</Form.Label>
              <Form.Control type="file" onChange={(e) => setFormData({...formData, doc_10th: e.target.files[0]})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="doc_12th">
              <Form.Label>12th Marksheet</Form.Label>
              <Form.Control type="file" onChange={(e) => setFormData({...formData, doc_12th: e.target.files[0]})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="doc_id">
              <Form.Label>ID Proof</Form.Label>
              <Form.Control type="file" onChange={(e) => setFormData({...formData, doc_id: e.target.files[0]})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password (min 8 characters) <span className="text-danger">*</span></Form.Label>
              <Form.Control type="password" isInvalid={!!errors.password} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              <PasswordStrengthIndicator password={formData.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
              <Form.Control type="password" isInvalid={!!errors.confirmPassword} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="terms">
              <Form.Check type="checkbox" isInvalid={!!errors.terms} label="I agree to the Terms & Conditions" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
              <Form.Control.Feedback type="invalid">{errors.terms}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button variant="secondary" className="ms-2" onClick={handleSaveAsDraft}>Save as Draft</Button>
            <Button variant="success" type="submit" className="ms-2">Register</Button>
          </Card.Body>
        );
      default:
        return <Card.Body>Form Completed</Card.Body>;
    }
  };

  const progress = (step / 3) * 100;

  return (
    <Card>
      <Card.Header>
        <ProgressBar now={progress} label={`Step ${step} of 3`} />
      </Card.Header>
      <Form onSubmit={handleSubmit}>
        {renderStep()}
      </Form>
    </Card>
  );
};

export default RegistrationForm;