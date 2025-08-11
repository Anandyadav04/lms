import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CourseCard({ course }) {
  const { user, enroll } = useAuth();

  const isEnrolled = user?.enrolledCourseIds?.includes(course.id);

  async function onEnroll(e) {
    e.preventDefault();
    const res = enroll(course.id);
    if (res.ok) {
      alert('Enrolled! Check dashboard.');
    } else {
      alert(res.message || 'Could not enroll');
    }
  }

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: '#fff',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <img
          src={course.imageUrl || '/images/react1.jpg'}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1 }}>
        <h3 style={{ marginBottom: '6px', fontSize: '1.2rem' }}>{course.title}</h3>
        <p className="small" style={{ marginBottom: '10px', color: '#666' }}>
          {course.subtitle}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>
          <strong>Duration:</strong> {course.duration || 'N/A'} <br />
          <strong>Level:</strong> {course.level || 'Beginner'}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <Link to={`/courses/${course.id}`} className="btn ghost">
            View
          </Link>
          {isEnrolled ? (
            <button className="btn" disabled style={{ background: '#ccc' }}>
              Enrolled
            </button>
          ) : (
            <button onClick={onEnroll} className="btn" style={{ background: '#2575fc', color: '#fff' }}>
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
