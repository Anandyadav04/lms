import React, { useState } from 'react'
import { useCourses } from '../context/CoursesContext'
import '../styles/AdminPanel.css' // We'll create this CSS file

export default function AdminPanel(){
  const { courses, addCourse, updateCourse, removeCourse } = useCourses()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingCourse, setEditingCourse] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editSubtitle, setEditSubtitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  function handleAdd(e){
    e.preventDefault()
    if (!title.trim()) {
      alert('Please enter a course title')
      return
    }
    
    addCourse({ 
      title, 
      subtitle, 
      description, 
      lessons: [],
      progress: 0,
      rating: 0
    })
    setTitle('')
    setSubtitle('')
    setDescription('')
  }

  function handleEdit(course) {
    setEditingCourse(course)
    setEditTitle(course.title)
    setEditSubtitle(course.subtitle || '')
    setEditDescription(course.description || '')
  }

  function handleUpdate(e) {
    e.preventDefault()
    if (!editTitle.trim()) {
      alert('Please enter a course title')
      return
    }
    
    updateCourse(editingCourse.id, { 
      title: editTitle, 
      subtitle: editSubtitle, 
      description: editDescription 
    })
    setEditingCourse(null)
    setEditTitle('')
    setEditSubtitle('')
    setEditDescription('')
  }

  function cancelEdit() {
    setEditingCourse(null)
    setEditTitle('')
    setEditSubtitle('')
    setEditDescription('')
  }

  return (
    <div className="admin-panel">
      <h1>Course Management</h1>
      
      {/* Create Course Form */}
      <div className="admin-card">
        <h3>Create New Course</h3>
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="form-group">
            <label>Title *</label>
            <input 
              className="admin-input" 
              placeholder="Course title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Subtitle</label>
            <input 
              className="admin-input" 
              placeholder="Course subtitle" 
              value={subtitle} 
              onChange={e => setSubtitle(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="admin-textarea" 
              placeholder="Course description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows="4"
            />
          </div>
          
          <button className="admin-btn primary" type="submit">
            Add Course
          </button>
        </form>
      </div>

      {/* Edit Course Form (when editing) */}
      {editingCourse && (
        <div className="admin-card editing">
          <h3>Edit Course: {editingCourse.title}</h3>
          <form className="admin-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Title *</label>
              <input 
                className="admin-input" 
                value={editTitle} 
                onChange={e => setEditTitle(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Subtitle</label>
              <input 
                className="admin-input" 
                value={editSubtitle} 
                onChange={e => setEditSubtitle(e.target.value)} 
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="admin-textarea" 
                value={editDescription} 
                onChange={e => setEditDescription(e.target.value)} 
                rows="4"
              />
            </div>
            
            <div className="form-actions">
              <button className="admin-btn primary" type="submit">
                Update Course
              </button>
              <button 
                className="admin-btn secondary" 
                type="button" 
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <section className="courses-section">
        <h2>All Courses ({courses.length})</h2>
        
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses found. Create your first course above.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map(course => (
              <div className="course-card" key={course.id}>
                <div className="course-info">
                  <h4>{course.title}</h4>
                  {course.subtitle && (
                    <p className="course-subtitle">{course.subtitle}</p>
                  )}
                  {course.description && (
                    <p className="course-description">{course.description}</p>
                  )}
                  <div className="course-stats">
                    <span className="stat">{course.lessons?.length || 0} lessons</span>
                    <span className="stat">{course.enrollmentCount || 0} enrollments</span>
                  </div>
                </div>
                
                <div className="course-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                        removeCourse(course.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}