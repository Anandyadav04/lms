import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { user } = useAuth()

  return (
    <div>
      <h1>Profile</h1>
      <div className="card" style={{maxWidth:540}}>
        <h3>{user?.name}</h3>
        <p className="small">{user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  )
}