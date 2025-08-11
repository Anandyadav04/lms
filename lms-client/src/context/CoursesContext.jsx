import React, { createContext, useContext, useEffect, useState } from 'react';
import { sampleCourses } from '../mock/sampleCourses';

const CoursesContext = createContext(null);

export function useCourses() {
  return useContext(CoursesContext);
}

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('lms_courses'));
      return Array.isArray(saved) && saved.length > 0 ? saved : sampleCourses;
    } catch {
      return sampleCourses;
    }
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses));
  }, [courses]);

  // Add new course with default fields if missing
  function addCourse(course) {
    const newCourse = {
      id: Date.now().toString(),
      title: course.title || 'Untitled Course',
      subtitle: course.subtitle || '',
      description: course.description || '',
      category: course.category || 'General',
      level: course.level || 'Beginner',
      duration: course.duration || 'Self-paced',
      imageUrl: course.imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image',
      lessons: course.lessons || [],
    };
    setCourses((prev) => [...prev, newCourse]);
  }

  // Update course fields
  function updateCourse(id, updates) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }

  // Remove course by id
  function removeCourse(id) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  // Filter courses by category
  function filterByCategory(category) {
    return courses.filter((c) => c.category === category);
  }

  // Search courses by title or subtitle
  function searchCourses(query) {
    const lowerQuery = query.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.subtitle.toLowerCase().includes(lowerQuery)
    );
  }

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        removeCourse,
        filterByCategory,
        searchCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
