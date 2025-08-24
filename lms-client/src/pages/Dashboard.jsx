import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import CourseCard from '../components/CourseCard'
import '../styles/Dashboard.css' // We'll create this CSS file

export default function Dashboard(){
  const { user } = useAuth()
  const { courses } = useCourses()

  const enrolled = courses.filter(c => user?.enrolledCourseIds?.includes(c.id))
  const completedCourses = enrolled.filter(c => c.progress === 100)
  const inProgressCourses = enrolled.filter(c => c.progress > 0 && c.progress < 100)
  const notStartedCourses = enrolled.filter(c => !c.progress || c.progress === 0)

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Hello, {user?.name}</span>
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-content">
            <h2>Welcome back, {user?.name}!</h2>
            <p>Continue your learning journey and discover new skills.</p>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-number">{enrolled.length}</span>
                <span className="stat-label">Enrolled Courses</span>
              </div>
              <div className="stat">
                <span className="stat-number">{completedCourses.length}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">{inProgressCourses.length}</span>
                <span className="stat-label">In Progress</span>
              </div>
            </div>
          </div>
          <div className="welcome-graphic">
            <div className="graphic-circle"></div>
          </div>
        </div>

        {/* Your Courses Section */}
        <section className="courses-section">
          <div className="section-header">
            <h2>Your Learning Path</h2>
            <div className="section-tabs">
              <button className="tab active">All Courses</button>
              <button className="tab">In Progress</button>
              <button className="tab">Completed</button>
            </div>
          </div>

          {enrolled.length ? (
            <div className="courses-grid">
              {enrolled.map(c => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No courses yet</h3>
              <p>You haven't enrolled in any courses. Explore our catalog to get started.</p>
              <button className="primary-button">Browse Courses</button>
            </div>
          )}
        </section>

        {/* Progress Overview */}
        {inProgressCourses.length > 0 && (
          <section className="progress-section">
            <h2>Continue Learning</h2>
            <div className="progress-cards">
              {inProgressCourses.slice(0, 2).map(course => (
                <div key={course.id} className="progress-card">
                  <div className="progress-info">
                    <h4>{course.title}</h4>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                    <span className="progress-percent">{course.progress}% complete</span>
                  </div>
                  <button className="resume-button">Resume</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
};