import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleCourses } from '../mock/sampleCourses';

const CoursesContext = createContext();

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 500);
  }, []);

  const getCourseById = (id) => {
    return courses.find(course => course.id === id);
  };

  const value = {
    courses,
    loading,
    getCourseById
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}