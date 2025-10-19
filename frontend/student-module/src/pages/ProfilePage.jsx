import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import api from '../api';

// Import tab components (which we will create next)
import PersonalInfoTab from '../components/profile/PersonalInfoTab';
import AcademicInfoTab from '../components/profile/AcademicInfoTab';
import EmergencyContactTab from '../components/profile/EmergencyContactTab';
import DocumentsTab from '../components/profile/DocumentsTab';
import SecurityTab from '../components/profile/SecurityTab';

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [key, setKey] = useState('personal');

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/student/profile');
      setStudentData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load profile data. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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

  return (
    <Container className="mt-4">
      <h2>My Profile</h2>
      <Tabs
        id="profile-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="personal" title="Personal & Contact">
          {/* Pass only the necessary data and the refresh function */}
          <PersonalInfoTab 
            profile={studentData}
            onUpdate={fetchProfileData} 
          />
        </Tab>
        <Tab eventKey="academic" title="Academic">
          <AcademicInfoTab profile={studentData} />
        </Tab>
        <Tab eventKey="emergency" title="Emergency Contact">
          <EmergencyContactTab 
            contact={studentData.emergency_contact} 
            onUpdate={fetchProfileData} 
          />
        </Tab>
        <Tab eventKey="documents" title="Documents">
          <DocumentsTab documents={studentData.documents} />
        </Tab>
        <Tab eventKey="security" title="Security">
          <SecurityTab />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;