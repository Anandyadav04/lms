import React, { useState } from 'react'
import { useCourses } from '../context/CoursesContext'

export default function AdminPanel(){
  const { courses, addCourse, updateCourse, removeCourse } = useCourses()
  const [title,setTitle] = useState('')
  const [subtitle,setSubtitle] = useState('')
  const [description,setDescription] = useState('')

  function handleAdd(e){
    e.preventDefault()
    addCourse({ title, subtitle, description, lessons: [] })
    setTitle(''); setSubtitle(''); setDescription('')
  }

  return (
    <div>
      <h1>Admin panel</h1>
      <div className="card" style={{marginTop:12}}>
        <h3>Create course</h3>
        <form className="form" onSubmit={handleAdd}>
          <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="input" placeholder="Subtitle" value={subtitle} onChange={e=>setSubtitle(e.target.value)} />
          <textarea className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="btn" type="submit">Add course</button>
        </form>
      </div>

      <section style={{marginTop:12}}>
        <h2>All courses</h2>
        <div className="grid" style={{marginTop:12}}>
          {courses.map(c => (
            <div className="card" key={c.id}>
              <h4>{c.title}</h4>
              <p className="small">{c.subtitle}</p>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button onClick={()=>removeCourse(c.id)} className="btn ghost">Delete</button>
                <button onClick={()=>updateCourse(c.id,{title:c.title + ' (updated)'})} className="btn">Quick Edit</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}