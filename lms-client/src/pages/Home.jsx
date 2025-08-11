import React, { useState } from 'react';
import { useCourses } from '../context/CoursesContext';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const { courses } = useCourses();
  const [search, setSearch] = useState('');

  const filteredCourses = courses
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 6);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        color: '#fff',
        padding: '50px 30px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to the LMS</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Learn new skills, explore courses, and track your progress — all in one place.
        </p>
        <Link to="/courses" style={{
          background: '#fff',
          color: '#4e54c8',
          padding: '10px 20px',
          borderRadius: '6px',
          fontWeight: 'bold',
          textDecoration: 'none',
          transition: 'background 0.3s ease'
        }}
          onMouseOver={e => e.target.style.background = '#f4f4f4'}
          onMouseOut={e => e.target.style.background = '#fff'}
        >
          Browse All Courses
        </Link>
      </section>

      {/* Search Bar */}
      <section style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </section>

      {/* Featured Course */}
      {courses.length > 0 && (
        <section style={{
          marginBottom: '30px',
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Featured Course</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <CourseCard course={courses[0]} />
            </div>
            <div style={{ flex: '2 1 400px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{courses[0].title}</h3>
              <p style={{ marginBottom: '15px' }}>{courses[0].description}</p>
              <Link to={`/courses/${courses[0].id}`} className="btn">
                View Course
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Popular Courses */}
      <section>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          borderBottom: '2px solid #eee',
          paddingBottom: '8px'
        }}>Popular Courses</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredCourses.map(c => (
            <div key={c.id} style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-in-out',
              cursor: 'pointer'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <CourseCard course={c} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
