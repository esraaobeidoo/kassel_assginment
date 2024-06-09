import axios from 'axios';

const API_URL = 'http://localhost:3007/api/courses';

const authHeader = () => ({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
});

export const getCourses = () => {
  return axios.get(API_URL);
};

export const createCourse = (course) => {
  return axios.post(API_URL, course, authHeader());
};

export const updateCourse = (id, course) => {
  return axios.put(`${API_URL}/${id}`, course, authHeader());
};

export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader());
};
