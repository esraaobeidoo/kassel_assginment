// src/components/CourseForm.js
import React, { useState } from 'react';
import { createCourse, updateCourse } from '../services/courseService';
import './CourseForm.css';

function CourseForm({ course = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: course.name || '',
    description: course.description || '',
    start_date: course.start_date || '',
    end_date: course.end_date || ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (course.id) {
        await updateCourse(course.id, formData);
      } else {
        await createCourse(formData);
      }
      onSubmit();
    } catch (ex) {
      setError('Error submitting course data');
    }
  };

  return (
    <div className="course-form">
      <h2>{course.id ? 'Edit Course' : 'Create Course'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">{course.id ? 'Update' : 'Create'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default CourseForm;
