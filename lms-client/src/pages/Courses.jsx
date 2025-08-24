import React, { useState } from 'react';
import { useCourses } from '../context/CoursesContext';
import CourseCard from '../components/CourseCard';

export default function CoursesPage() {
  const { courses, loading } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Get unique categories and levels for filters
  const categories = ['All', ...new Set(courses.map(course => course.category))];
  const levels = ['All', ...new Set(courses.map(course => course.level))];
  
  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2>Loading courses...</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#2d3748',
          marginBottom: '8px'
        }}>
          Available Courses
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#718096',
          marginBottom: '24px'
        }}>
          Explore our catalog of courses to enhance your skills
        </p>
        
        {/* Search Box */}
        <div style={{
          maxWidth: '500px',
          marginBottom: '24px'
        }}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          />
        </div>
        
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}>
          <div>
            <strong>Category: </strong>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                marginLeft: '8px'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <strong>Level: </strong>
            <select 
              value={filterLevel} 
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                marginLeft: '8px'
              }}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ fontSize: '0.9rem', color: '#718096' }}>
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            gridColumn: '1 / -1'
          }}>
            <h3 style={{ marginBottom: '12px', color: '#2d3748' }}>No courses found</h3>
            <p style={{ color: '#718096', marginBottom: '20px' }}>
              Try adjusting your search or filters
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterLevel('All');
                setFilterCategory('All');
              }}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}