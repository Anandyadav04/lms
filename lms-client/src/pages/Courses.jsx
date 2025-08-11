import React from 'react';
import { useCourses } from '../context/CoursesContext';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        background: '#f9f9f9',
        minHeight: '100vh'
      }}
    >
      {/* Page Header */}
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#333'
          }}
        >
          📚 All Courses
        </h1>
        <p style={{ fontSize: '1rem', color: '#666' }}>
          Browse our complete library of learning resources
        </p>
      </header>

      {/* Courses Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}
      >
        {courses.map((c) => (
          <div
            key={c.id}
            style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            }}
          >
            <CourseCard course={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
