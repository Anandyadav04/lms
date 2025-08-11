import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API, { loginReq } from '../services/api'

const AuthContext = createContext(null)

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try{
      return JSON.parse(localStorage.getItem('lms_user')) || null
    }catch{ return null }
  })
  const navigate = useNavigate()

  useEffect(()=>{
    localStorage.setItem('lms_user', JSON.stringify(user))
  },[user])

  async function login({ email, password }){
    // try real API first, fallback to mock
    try{
      const res = await loginReq({ email, password })
      setUser(res.data.user)
      return { ok:true }
    }catch(err){
      // fallback mock behavior
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
      return { ok:false, message: 'Invalid credentials (try admin/admin or anyemail/student)' }
    }
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('lms_user')
    navigate('/')
  }

  function register({ name, email, password }){
    // simple local register (no server). In real APP call register endpoint
    const newUser = { id: Date.now(), name, email, role: 'student', enrolledCourseIds: [] }
    setUser(newUser)
    return { ok:true }
  }

  function enroll(courseId){
    if(!user) return { ok:false, message: 'Login required' }
    if(user.enrolledCourseIds?.includes(courseId)) return { ok:false, message: 'Already enrolled' }
    const updated = { ...user, enrolledCourseIds: [...(user.enrolledCourseIds||[]), courseId] }
    setUser(updated)
    return { ok:true }
  }

  function unenroll(courseId){
    if(!user) return { ok:false }
    const updated = { ...user, enrolledCourseIds: (user.enrolledCourseIds || []).filter(id => id !== courseId) }
    setUser(updated)
    return { ok:true }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, enroll, unenroll }}>
      {children}
    </AuthContext.Provider>
  )
}
