import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import CourseCard from '../components/CourseCard'
import '../styles/Dashboard.css'

export default function Dashboard(){
  const { user, users } = useAuth()
  const { courses } = useCourses()

  const enrolled = courses.filter(c => user?.enrolledCourseIds?.includes(c.id))
  const completedCourses = enrolled.filter(c => c.progress === 100)
  const inProgressCourses = enrolled.filter(c => c.progress > 0 && c.progress < 100)
  const notStartedCourses = enrolled.filter(c => !c.progress || c.progress === 0)

  // Get all students (non-admin users)
  const students = users.filter(u => u.role !== 'admin')

  // Admin dashboard view
  if (user?.role === 'admin') {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Hello,  {user?.name}</span>
            <div className="user-avatar admin">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Admin Stats Overview */}
          <div className="admin-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{courses.length}</h3>
                <p>Total Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{students.reduce((acc, student) => acc + (student.completedCourses || 0), 0)}</h3>
                <p>Courses Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>{students.length > 0 
                  ? Math.round(students.reduce((acc, student) => acc + (student.progress || 0), 0) / students.length)
                  : 0}%</h3>
                <p>Average Progress</p>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <section className="admin-section">
            <h2>Student Reports</h2>
            <div className="students-table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Enrolled Courses</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.enrolledCourseIds?.length || 0}</td>
                      <td>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${student.progress || 0}%`}}
                          ></div>
                        </div>
                        <span className="progress-text">{student.progress || 0}%</span>
                      </td>
                      <td>
                        <button className="action-button view">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Course Analytics */}
          <section className="admin-section">
            <h2>Course Analytics</h2>
            <div className="courses-analytics">
              {courses.map(course => {
                const enrolledStudents = users.filter(u => 
                  u.enrolledCourseIds?.includes(course.id)
                ).length;
                
                return (
                  <div key={course.id} className="analytics-card">
                    <h4>{course.title}</h4>
                    <div className="analytics-stats">
                      <div className="stat">
                        <span className="number">{enrolledStudents}</span>
                        <span className="label">Enrollments</span>
                      </div>
                      <div className="stat">
                        <span className="number">{Math.floor(Math.random() * 100)}%</span>
                        <span className="label">Completion Rate</span>
                      </div>
                      <div className="stat">
                        <span className="number">{course.rating || 'N/A'}</span>
                        <span className="label">Rating</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    )
  }

  // Regular user dashboard
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

}