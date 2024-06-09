// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/courseService';
import './CourseList.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data } = await getCourses();
        setCourses(data);
      } catch (ex) {
        setError('Error fetching courses');
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Start Date: {new Date(course.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(course.end_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
