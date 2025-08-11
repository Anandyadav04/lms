import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CoursesContext'
import CourseCard from '../components/CourseCard'

export default function Dashboard(){
  const { user } = useAuth()
  const { courses } = useCourses()

  const enrolled = courses.filter(c => user?.enrolledCourseIds?.includes(c.id))

  return (
    <div>
      <h1>Your dashboard</h1>
      <div className="card" style={{marginTop:12}}>
        <h3>Welcome back, {user?.name}</h3>
        <p className="small">Role: {user?.role}</p>
      </div>

      <section style={{marginTop:16}}>
        <h2>Your courses</h2>
        {enrolled.length ? (
          <div className="grid" style={{marginTop:12}}>
            {enrolled.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        ) : (
          <div className="card">You haven't enrolled in any courses yet.</div>
        )}
      </section>
    </div>
  )
}
