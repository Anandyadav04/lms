import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 5000,
})

export default API

export const fetchCourses = () => API.get('/courses')
export const fetchCourse = (id) => API.get(`/courses/${id}`)
export const loginReq = (creds) => API.post('/auth/login', creds)
export const registerReq = (payload) => API.post('/auth/register', payload)