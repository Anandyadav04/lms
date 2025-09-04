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
      console.log("API login failed, trying fallback:", err)
      
      // fallback: check in saved users
      const existingUser = users.find(u => u.email === email && u.password === password)
      if(existingUser){
        console.log("Found user in local storage:", existingUser)
        setUser(existingUser)
        return { ok:true }
      }

      // fallback mock users
      if(email === 'admin@lms.com' && password === 'admin'){ 
        console.log("Using admin fallback")
        const admin = { 
          id: 1, 
          name: 'Admin', 
          email, 
          role: 'admin', 
          enrolledCourseIds: [],
          // Add password to make sure it's saved for future logins
          password: 'admin'
        }
        setUser(admin)
        // Also add to users list if not already there
        if (!users.find(u => u.email === email)) {
          setUsers([...users, admin])
        }
        return { ok:true }
      }
      
      if(password === 'student'){ 
        console.log("Using student fallback")
        const student = { 
          id: Date.now(), 
          name: email.split('@')[0], // Use part of email as name
          email, 
          role: 'student', 
          enrolledCourseIds: [],
          password: 'student' // Save the password
        }
        setUser(student)
        // Also add to users list if not already there
        if (!users.find(u => u.email === email)) {
          setUsers([...users, student])
        }
        return { ok:true }
      }

      console.log("No matching user found")
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
    const newUser = { 
      id: Date.now(), 
      name, 
      email, 
      password, 
      role: 'student', 
      enrolledCourseIds: [],
      progress: 0
    }
    setUsers([...users, newUser])  // save to users list
    setUser(newUser)               // auto login
    return { ok:true }
  }

  // enroll
  function enroll(courseId){
    if(!user) return { ok:false, message: 'Login required' }
    if(user.enrolledCourseIds?.includes(courseId)) return { ok:false, message: 'Already enrolled' }
    
    const updated = { 
      ...user, 
      enrolledCourseIds: [...(user.enrolledCourseIds||[]), courseId] 
    }
    setUser(updated)
    // update also in users list
    setUsers(users.map(u => u.id === user.id ? updated : u))
    return { ok:true }
  }

  // unenroll
  function unenroll(courseId){
    if(!user) return { ok:false }
    const updated = { 
      ...user, 
      enrolledCourseIds: (user.enrolledCourseIds || []).filter(id => id !== courseId) 
    }
    setUser(updated)
    setUsers(users.map(u => u.id === user.id ? updated : u))
    return { ok:true }
  }

  // update user progress
  function updateProgress(courseId, progress){
    if(!user) return { ok:false }
    
    // For simplicity, we'll just update the user's overall progress
    // In a real app, you might want to track progress per course
    const updated = { 
      ...user, 
      progress: Math.max(user.progress || 0, progress)
    }
    setUser(updated)
    setUsers(users.map(u => u.id === user.id ? updated : u))
    return { ok:true }
  }

  const value = {
    user,
    users,
    login,
    logout,
    register,
    enroll,
    unenroll,
    updateProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}