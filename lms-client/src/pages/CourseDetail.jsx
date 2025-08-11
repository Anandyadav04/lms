import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const { courses } = useCourses();
  const { user, enroll } = useAuth();

  const course = courses.find(c => c.id === id);
  if (!course) return <div className="card">❌ Course not found</div>;

  const isEnrolled = user?.enrolledCourseIds?.includes(id);

  function handleEnroll() {
    const res = enroll(id);
    if (res.ok) alert('✅ Enrolled!');
    else alert(res.message || '⚠️ Please login to enroll');
  }

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        background: '#f9f9f9',
        minHeight: '100vh'
      }}
    >
      {/* Left Column: Course Overview & Lessons */}
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}
      >
        <h1 style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#333' }}>
          {course.title}
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
          {course.subtitle}
        </p>
        <p style={{ lineHeight: '1.6', marginBottom: '28px', color: '#444' }}>
          {course.description}
        </p>

        {/* Lessons Section */}
        <h3
          style={{
            marginBottom: '14px',
            borderBottom: '2px solid #eee',
            paddingBottom: '6px',
            color: '#333'
          }}
        >
          Lessons ({course.lessons.length})
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '18px'
          }}
        >
          {course.lessons.map(lesson => (
            <div
              key={lesson.id}
              style={{
                background: '#fafafa',
                borderRadius: '10px',
                padding: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            >
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#333' }}>
                {lesson.title}
              </h4>
              <video
                controls
                width="100%"
                src={lesson.videoUrl}
                style={{ borderRadius: '8px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Sidebar Info */}
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          height: 'fit-content'
        }}
      >
        <img
          src={course.thumbnail || 'https://via.placeholder.com/400x200?text=Course+Image'}
          alt={course.title}
          style={{
            width: '100%',
            borderRadius: '10px',
            marginBottom: '16px'
          }}
        />

        <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>
          Course Info
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '20px' }}>
          Duration: {course.duration || 'N/A'} <br />
          Level: {course.level || 'Beginner'}
        </p>

        {isEnrolled ? (
          <button
            style={{
              width: '100%',
              padding: '12px',
              background: '#ccc',
              color: '#fff',
              cursor: 'not-allowed',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold'
            }}
            disabled
          >
            ✅ You're Enrolled
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            style={{
              width: '100%',
              padding: '12px',
              background: '#2575fc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🚀 Enroll in this Course
          </button>
        )}
      </div>
    </div>
  );
}
