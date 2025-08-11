import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const res = auth.register({ name, email, password });
    if (res.ok) navigate('/dashboard');
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f4f6f8'
    }}>
      {/* Left side image */}
      <div style={{
        flex: 1,
        background: 'url(https://source.unsplash.com/800x800/?online,learning) center/cover no-repeat'
      }}></div>

      {/* Right side register form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          padding: '40px'
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            fontSize: '2rem',
            color: '#333',
            textAlign: 'center'
          }}>
            Create Your LMS Account
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>
          </form>
          <p style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: '#777'
          }}>
            Already have an account? <a href="/login" style={{ color: '#2575fc' }}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
