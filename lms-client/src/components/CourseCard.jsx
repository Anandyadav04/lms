import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CourseCard({ course }) {
  const { user, enroll } = useAuth();
  const [imgError, setImgError] = useState(false);
  
  const isEnrolled = user?.enrolledCourseIds?.includes(course.id);

  async function onEnroll(e) {
    e.preventDefault();
    try {
      const res = await enroll(course.id);
      if (res.ok) {
        alert('Enrolled! Check dashboard.');
      } else {
        alert(res.message || 'Could not enroll');
      }
    } catch (error) {
      alert('An error occurred during enrollment');
      console.error('Enrollment error:', error);
    }
  }

  // Default image path
  const defaultImage = '/images/react1.jpg';
  
  // Handle image loading errors
  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div
      className="course-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        background: '#fff',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
    >
      {/* Thumbnail */}
      <div style={{ 
        height: '180px', 
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f5f7fa'
      }}>
        <img
          src={imgError ? defaultImage : (course.imageUrl || defaultImage)}
          alt={course.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onError={handleImageError}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        {course.level && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {course.level}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          marginBottom: '8px', 
          fontSize: '1.2rem',
          fontWeight: '600',
          color: '#2d3748'
        }}>
          {course.title}
        </h3>
        <p style={{ 
          marginBottom: '12px', 
          color: '#718096',
          fontSize: '0.9rem',
          flexGrow: 1
        }}>
          {course.subtitle}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: '#4a5568'
        }}>
          <span><strong>Duration:</strong> {course.duration || 'N/A'}</span>
          <span><strong>Lessons:</strong> {course.lessons?.length || 0}</span>
        </div>

        {/* Progress indicator for enrolled courses */}
        {isEnrolled && user?.courseProgress?.[course.id] > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
              fontSize: '0.8rem',
              color: '#718096'
            }}>
              <span>Progress</span>
              <span>{user.courseProgress[course.id]}%</span>
            </div>
            <div style={{
              height: '6px',
              width: '100%',
              background: '#e2e8f0',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${user.courseProgress[course.id]}%`,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '3px'
              }}></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to={`/courses/${course.id}`}
            style={{
              padding: '8px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              color: '#4a5568',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              flex: 1,
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f7fafc';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            View Details
          </Link>
          {isEnrolled ? (
            <button 
              style={{ 
                padding: '8px 16px',
                background: '#48bb78',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                flex: 1,
                cursor: 'default'
              }}
              disabled
            >
              Enrolled
            </button>
          ) : (
            <button 
              onClick={onEnroll} 
              style={{ 
                padding: '8px 16px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                flex: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}