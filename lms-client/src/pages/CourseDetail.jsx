import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enroll } = useAuth();
  const { getCourseById } = useCourses();
  
  const course = getCourseById(id);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(0);

  if (!course) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses" style={{
          display: 'inline-block',
          marginTop: '16px',
          padding: '10px 20px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          Back to Courses
        </Link>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourseIds?.includes(course.id);
  const progress = user?.courseProgress?.[course.id] || 0;
  
  // Default image path
  const defaultImage = '/images/react1.jpg';
  
  // Handle image loading errors
  const handleImageError = () => {
    setImgError(true);
  };

  async function handleEnroll() {
    const res = enroll(course.id);
    if (res.ok) {
      alert('Enrolled successfully! You can now access all lessons.');
    } else {
      alert(res.message || 'Could not enroll in this course');
    }
  }

  function handleLessonSelect(index) {
    if (isEnrolled) {
      setCurrentLesson(index);
    }
  }

  function markLessonComplete() {
    // In a real app, you would update progress in the backend
    alert('Lesson marked as complete! Progress would be saved in a real application.');
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      {/* Breadcrumb Navigation */}
      <nav style={{ marginBottom: '24px' }}>
        <Link to="/courses" style={{ color: '#667eea', textDecoration: 'none' }}>
          &larr; Back to Courses
        </Link>
      </nav>

      {/* Course Header */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          gap: '32px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }}>
          {/* Course Image */}
          <div style={{ 
            flex: '0 0 40%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <img
              src={imgError ? defaultImage : (course.imageUrl || defaultImage)}
              alt={course.title}
              style={{ 
                width: '100%', 
                height: '300px',
                objectFit: 'cover'
              }}
              onError={handleImageError}
            />
          </div>

          {/* Course Info */}
          <div style={{ flex: 1 }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h1 style={{ 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    color: '#2d3748',
                    marginBottom: '8px'
                  }}>
                    {course.title}
                  </h1>
                  <p style={{ 
                    fontSize: '18px', 
                    color: '#718096',
                    marginBottom: '16px'
                  }}>
                    {course.subtitle}
                  </p>
                </div>
                
                <div style={{
                  padding: '6px 12px',
                  background: '#e9d8fd',
                  color: '#553c9a',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  {course.level}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '24px',
                marginBottom: '24px'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Duration</div>
                  <div style={{ fontWeight: '600' }}>{course.duration || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Lessons</div>
                  <div style={{ fontWeight: '600' }}>{course.lessons?.length || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Category</div>
                  <div style={{ fontWeight: '600' }}>{course.category}</div>
                </div>
              </div>

              {isEnrolled ? (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span>Your progress</span>
                    <span>{progress}% complete</span>
                  </div>
                  <div style={{
                    height: '8px',
                    width: '100%',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('lessons')}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEnroll}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Enroll in Course
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 24px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '2px solid #667eea' : '2px solid transparent',
              color: activeTab === 'overview' ? '#667eea' : '#718096',
              fontWeight: activeTab === 'overview' ? '600' : '400',
              cursor: 'pointer'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            style={{
              padding: '12px 24px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'lessons' ? '2px solid #667eea' : '2px solid transparent',
              color: activeTab === 'lessons' ? '#667eea' : '#718096',
              fontWeight: activeTab === 'lessons' ? '600' : '400',
              cursor: 'pointer'
            }}
          >
            Lessons {course.lessons && `(${course.lessons.length})`}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#2d3748',
              marginBottom: '16px'
            }}>
              About this course
            </h2>
            <p style={{ 
              lineHeight: '1.6',
              color: '#4a5568',
              marginBottom: '24px'
            }}>
              {course.description}
            </p>
            
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#2d3748',
              marginBottom: '16px'
            }}>
              What you'll learn
            </h3>
            <ul style={{ 
              paddingLeft: '24px',
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              {course.lessons?.map((lesson, index) => (
                <li key={lesson.id} style={{ marginBottom: '8px' }}>
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div style={{
            display: 'flex',
            gap: '32px',
            flexDirection: window.innerWidth < 992 ? 'column' : 'row'
          }}>
            {/* Lessons List */}
            <div style={{ 
              flex: '0 0 300px',
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '16px'
              }}>
                Course Content
              </h3>
              
              <div style={{
                fontSize: '0.9rem',
                color: '#718096',
                marginBottom: '16px'
              }}>
                {course.lessons?.length} lessons • {course.duration}
              </div>
              
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {course.lessons?.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    onClick={() => handleLessonSelect(index)}
                    style={{
                      padding: '12px',
                      borderLeft: currentLesson === index ? '3px solid #667eea' : '3px solid transparent',
                      background: currentLesson === index ? '#f7fafc' : 'transparent',
                      cursor: isEnrolled ? 'pointer' : 'default',
                      opacity: isEnrolled ? 1 : 0.6,
                      marginBottom: '8px',
                      borderRadius: '4px'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: index < progress/course.lessons.length*100 ? '#48bb78' : '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: index < progress/course.lessons.length*100 ? 'white' : '#718096',
                        fontWeight: '600'
                      }}>
                        {index < progress/course.lessons.length*100 ? '✓' : index + 1}
                      </div>
                      <div>
                        <div style={{ 
                          fontWeight: currentLesson === index ? '600' : '400',
                          color: currentLesson === index ? '#667eea' : '#2d3748'
                        }}>
                          {lesson.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Content */}
            <div style={{ 
              flex: 1,
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {isEnrolled ? (
                <>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '600', 
                    color: '#2d3748',
                    marginBottom: '16px'
                  }}>
                    {course.lessons[currentLesson]?.title}
                  </h2>
                  
                  <div style={{
                    marginBottom: '24px'
                  }}>
                    <video 
                      controls 
                      style={{ 
                        width: '100%', 
                        borderRadius: '8px',
                        background: '#000'
                      }}
                    >
                      <source src={course.lessons[currentLesson]?.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                      Lesson {currentLesson + 1} of {course.lessons.length}
                    </div>
                    
                    <button 
                      onClick={markLessonComplete}
                      style={{
                        padding: '8px 16px',
                        background: '#48bb78',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Mark as Complete
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ 
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#2d3748',
                    marginBottom: '12px'
                  }}>
                    Enroll to access lessons
                  </h3>
                  <p style={{ 
                    color: '#718096',
                    marginBottom: '24px'
                  }}>
                    You need to enroll in this course to view the lessons.
                  </p>
                  <button 
                    onClick={handleEnroll}
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
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}