
import React, { useState, useEffect } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import CourseCard from '../courses/CourseCard';
import api from '../../api';

const RunningCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRunningCourses = async () => {
      try {
        const studentRes = await api.get('/student/profile');
        const { department, year, semester } = studentRes.data;

        console.log('Student Profile:', studentRes.data);

        if (department && department._id && semester) {
          const courseSemester = semester % 2 === 0 ? 2 : 1;
          console.log(`Fetching courses for Dept ID: ${department._id}, Course Semester: ${courseSemester}, Student Year: ${year}`);
          
          const coursesRes = await api.get(`/student/courses/${department._id}/${courseSemester}`);
          console.log('Raw courses from API:', coursesRes.data);

          const runningCourses = coursesRes.data.filter(course => course.year === year);
          console.log('Filtered running courses:', runningCourses);
          setCourses(runningCourses);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchRunningCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div>
      <h3 className="mb-4">Running Courses</h3>
      <p>Debug: Courses data: {JSON.stringify(courses)}</p> {/* Temporary debug display */}
      {courses.length > 0 ? (
        <Row>
          {courses.map(course => (
            <Col md={4} key={course._id}>
              <CourseCard course={course} status={<Badge bg="primary">Running</Badge>} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No courses found for this semester and department.</p>
      )}
    </div>
  );
};

export default RunningCourses;
