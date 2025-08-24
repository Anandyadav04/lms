import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API, { loginReq } from '../services/api'

const AuthContext = createContext(null)

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({ children }){
  // Load logged-in user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lms_user')) || null
    } catch {
      return null
    }
  })

  // Load registered users list (like a fake DB)
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lms_users')) || []
    } catch {
      return []
    }
  })

  const navigate = useNavigate()

  // keep user in localStorage
  useEffect(()=>{
    localStorage.setItem('lms_user', JSON.stringify(user))
  },[user])

  // keep users list in localStorage
  useEffect(()=>{
    localStorage.setItem('lms_users', JSON.stringify(users))
  },[users])

  // login
  async function login({ email, password }){
    try {
      // try real API first
      const res = await loginReq({ email, password })
      setUser(res.data.user)
      return { ok:true }
    } catch(err) {
      // fallback: check in saved users
      const existingUser = users.find(u => u.email === email && u.password === password)
      if(existingUser){
        setUser(existingUser)
        return { ok:true }
      }

      // fallback mock users
      if(email === 'admin@lms.com' && password === 'admin'){ 
        const admin = { id: 1, name: 'Admin', email, role: 'admin', enrolledCourseIds: [] }
        setUser(admin)
        return { ok:true }
      }
      if(password === 'student'){ 
        const student = { id: 2, name: 'Student', email, role: 'student', enrolledCourseIds: [] }
        setUser(student)
        return { ok:true }
      }

      return { ok:false, message: 'Invalid credentials' }
    }
  }

  // logout
  function logout(){
    setUser(null)
    localStorage.removeItem('lms_user')
    navigate('/')
  }

  // register
  function register({ name, email, password }){
    if(users.find(u => u.email === email)){
      return { ok:false, message: 'User already exists' }
    }
    const newUser = { id: Date.now(), name, email, password, role: 'student', enrolledCourseIds: [] }
    setUsers([...users, newUser])  // save to users list
    setUser(newUser)               // auto login
    return { ok:true }
  }

  // enroll
  function enroll(courseId){
    if(!user) return { ok:false, message: 'Login required' }
    if(user.enrolledCourseIds?.includes(courseId)) return { ok:false, message: 'Already enrolled' }
    const updated = { ...user, enrolledCourseIds: [...(user.enrolledCourseIds||[]), courseId] }
    setUser(updated)
    // update also in users list
    setUsers(users.map(u => u.id === user.id ? updated : u))
    return { ok:true }
  }

  // unenroll
  function unenroll(courseId){
    if(!user) return { ok:false }
    const updated = { ...user, enrolledCourseIds: (user.enrolledCourseIds || []).filter(id => id !== courseId) }
    setUser(updated)
    setUsers(users.map(u => u.id === user.id ? updated : u))
    return { ok:true }
  }

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, enroll, unenroll }}>
      {children}
    </AuthContext.Provider>
  )
}

